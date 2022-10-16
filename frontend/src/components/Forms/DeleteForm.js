import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TYPES_RESORUCES } from "../../data/data";
import { deleteObject } from "../../API/apiCalls";
import FormContext from "../../context/form-context";
import BooksContext from "../../context/books-context";
import StudentsContext from "../../context/students-context";

const DeleteForm = () => {
    const { selectedItem, toggleModal, mode, itemType } = useContext(FormContext);
    const navigate = useNavigate();
    const { deleteBook, updateBook } = useContext(BooksContext);
    const { deleteStudent, updateStudent } = useContext(StudentsContext);

    const onDelete = async (e) => {
        e.preventDefault();
        toggleModal();
        const deletedItem = await deleteObject(itemType, selectedItem._id);

        switch (itemType) {
            case TYPES_RESORUCES.BOOKS:
                deleteBook(deletedItem.book);
                if (deletedItem.student) {
                    updateStudent(deletedItem.student);
                }
                break;
            case TYPES_RESORUCES.LIBRARIES:
                navigate("/");
                break;
            case TYPES_RESORUCES.STUDENTS:
                deleteStudent(deletedItem.student);
                if (deletedItem.book) {
                    updateBook(deletedItem.book);
                }

                break;
            default:
                break;
        }
    }
    return (
        <div className="">
            {mode === 'delete' &&
                <>
                    <p>Ste si istý, že chcete zmazať <b>{selectedItem && (selectedItem.title ? selectedItem.title : selectedItem.name)}</b>? </p>
                    <button className="btn-delete" type="button" onClick={onDelete}>Zmazať</button>
                </>
            }
        </div>
    );
}
export default DeleteForm;