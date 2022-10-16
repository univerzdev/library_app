import { useReducer } from "react";

import StudentsContext from "./students-context";

const defaultState = {
    students: [],
    availableStudents: []
}

const studentReducer = (state, action) => {
    if (action.type === 'SET_STUDENTS') {
        return { ...state, students: action.payload};
    }
    if (action.type === 'SET_AVAILABLE_STUDENTS') {
        return { ...state, availableStudents: action.payload};
    }
    if (action.type === 'CREATE_STUDENT') {
        return { ...state, students: [action.payload, ...state.students] }
    }
    if (action.type === 'UPDATE_STUDENT') {
        return { ...state.availableStudents, students: state.students.map((student) => student._id === action.payload._id ? action.payload : student )}
    }
    if (action.type === 'DELETE_STUDENT') {
        return { ...state.availableStudents, students: state.students.filter((student) => student._id !== action.payload._id)}
    }
    if (action.type === 'REPLACE_BOOK_DATA') {
        return { ...state.availableStudents, students: state.students.map((student) => student.borrowedBook?._id === action.payload._id ? {...student, borrowedBook: action.payload} : student )}
    }
    return state;
}

const StudentsProvider = props => {
    const [studentState, dispatchStudentAction] = useReducer(
        studentReducer, defaultState
    );

    const setStudents = (students) => {
        dispatchStudentAction({ type: 'SET_STUDENTS', payload: students })
    }
    const setAvailableStudents = (students) => {
        dispatchStudentAction({ type: 'SET_AVAILABLE_STUDENTS', payload: students })
    }

    const createStudent = (newStudent) => {
        dispatchStudentAction({ type: 'CREATE_STUDENT', payload: newStudent })
    };
    const updateStudent = (student) => {
        dispatchStudentAction({ type: 'UPDATE_STUDENT', payload: student })
    };
    const deleteStudent = (student) => {
        dispatchStudentAction({ type: 'DELETE_STUDENT', payload: student })
    }
    const  replaceBookData = (book) => {
        dispatchStudentAction({ type: 'REPLACE_BOOK_DATA', payload: book })
    }
   
    const studentsContext = {
        students: studentState.students,
        availableStudents: studentState.availableStudents,
        createStudent: createStudent,
        updateStudent: updateStudent,
        deleteStudent: deleteStudent,
        setStudents: setStudents,
        setAvailableStudents: setAvailableStudents,
        replaceBookData: replaceBookData
    }
    return <StudentsContext.Provider value={studentsContext}>{props.children}</StudentsContext.Provider>
}

export default StudentsProvider;
