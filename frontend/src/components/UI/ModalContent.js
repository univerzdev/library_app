import { useContext } from "react";
import FormContext from "../../context/form-context";
import { TYPES_RESORUCES } from "../../data/data";
import BookForm from "../Forms/BookForm";
import BookRentForm from "../Forms/BookRentForm";
import DeleteForm from "../Forms/DeleteForm";
import LibraryForm from "../Forms/LibraryForm";
import Modal from "./Modal";
import StudentForm from "../Forms/StudentForm";
const ModalContent = (props) => {
    const {modal, mode, itemType} = useContext(FormContext);
    const modalContent = () => {
        if (modal) {
            if (mode === 'delete') {
                return <DeleteForm />
            }
            if (mode === 'rent') {
                return <BookRentForm/>
            }
            switch (itemType) {
                case TYPES_RESORUCES.LIBRARIES:
                    return <LibraryForm />;
                case TYPES_RESORUCES.BOOKS:
                    return <BookForm />
                case TYPES_RESORUCES.STUDENTS:
                    return <StudentForm />;
                default:
                    return <></>;
            }
        }
        return <></>;
    }
    return (
        <>
        <Modal>{modalContent()}</Modal>
        {props.children}
        </>
   )
}

export default ModalContent;