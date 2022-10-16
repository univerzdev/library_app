import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TABLE_STUDENTS_FIELDS, TYPES_RESORUCES } from "../data/data";
import FormContext from "../context/form-context";
import Table from "./UI/Table";

const LibraryStudents = (props) => {
    const { students } = props;
    const formCtx = useContext(FormContext);
    const navigate = useNavigate();

    const LIBRARY_TABLE_ACTIONS = [
        {
            onClick: (item) => formCtx.selectItem(TYPES_RESORUCES.STUDENTS, item),
            text: 'Upraviť',
            hiddenClasses: "bg-blue-300"
        },
        {
            onClick: (item) => formCtx.deleteItem(TYPES_RESORUCES.STUDENTS, item),
            text: 'Odstrániť',
            hiddenClasses: "bg-red-500"
        },
        {
            onClick: (item) => navigate(`/${TYPES_RESORUCES.STUDENTS}/${item._id}`),
            text: 'História',
            hiddenClasses: "bg-green-500"
        }
    ];
    let filteredStudents = [];
    students.forEach(book => {
        let { _id, name, borrowedBook, borrowedBooks } = book;
        filteredStudents.push({
            _id,
            name,
            borrowed: borrowedBook? borrowedBook.title : '-',
            borrowed_c: borrowedBooks.length,
            hiddenClasses: borrowedBook ? '' : "bg-green-100"
        })
    });
    
    return (
        <>
            <h2 className="headline-table mt-16">Študenti</h2>
            <button onClick={() => formCtx.toggleModal(TYPES_RESORUCES.STUDENTS)} className="btn">Vytvoriť nového študenta</button>
            <Table fields={TABLE_STUDENTS_FIELDS} data={filteredStudents} actions={LIBRARY_TABLE_ACTIONS} />
        </>
    )

}
export default LibraryStudents;
