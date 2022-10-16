import React from 'react';

const StudentsContext = React.createContext({
    students: [],
    availableStudents: [],
    setStudents: (students) => {},
    setAvailableStudents: (students) => {},
    createStudent: (student) => {},
    updateStudent: (student) => {},
    deleteStudent: (student) => {},
    replaceBookData: (book) => {}
});

export default StudentsContext;