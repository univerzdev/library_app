import { useContext, useRef } from "react";
import { useParams } from 'react-router-dom';

import { TYPES_RESORUCES } from "../../data/data";
import { createNewObject, updateObject } from "../../API/apiCalls";

import FormContext from "../../context/form-context";
import StudentsContext from "../../context/students-context";

const UserForm = () => {
    const { id } = useParams();
    const { selectedItem, mode, toggleModal } = useContext(FormContext);
    const { createStudent, updateStudent } = useContext(StudentsContext);
    const nicknameRef = useRef();
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        toggleModal();
        const student = {
            name: nicknameRef.current.value,
            library: selectedItem ? selectedItem.hidden_library_id : id
        }
        if (mode === '') {
            const newStudent = await createNewObject(TYPES_RESORUCES.STUDENTS,student);
            if(newStudent){
                createStudent(newStudent);
            }
        }
        else {
            const updatedStudent = await updateObject(TYPES_RESORUCES.STUDENTS,selectedItem._id,student);
            if(updatedStudent){
                updateStudent(updatedStudent);
            }
        }
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <h3 className="headline-3">{selectedItem ? "Upraviť študenta" : "Vytvoriť nového študenta"}</h3>
            <div className="flex-column">
                <label htmlFor="title">Meno študenta</label>
                <input ref={nicknameRef} className="input" type="text" id="title" defaultValue={selectedItem && selectedItem.name} required />
            </div>
            <div>
                <button className="btn" type="submit">{selectedItem ? "Potvrdiť" : "Vytvoriť študenta"}</button>
            </div>
        </form>
    );
}

export default UserForm;
