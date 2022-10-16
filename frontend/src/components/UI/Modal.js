import React, { useContext} from "react";
import ReactDOM from 'react-dom';
import FormContext from "../../context/form-context";

const Backdrop = (props) => {
    const formCtx = useContext(FormContext);
    const onClickHandler = (event) => {
        if (event.target === event.currentTarget) {
            formCtx.toggleModal();
        }
    }
    return (
        <div onClick={onClickHandler} className="backdrop fixed w-full h-full bg-black bg-opacity-60 z-10">
            {props.children}
        </div>
    )
}
const item = document.getElementById("backdrop");
const Modal = (props) => {
    const formCtx = useContext(FormContext);
    return (
        <>
            {
                formCtx.modal && 
                ReactDOM.createPortal( <Backdrop>
                    <div className="modal px-12 py-16 bg-white mx-auto my-auto w-1/3 mt-24 rounded-lg">
                        {props.children}
                    </div>
                </Backdrop>,item )
               
            }
        </>)

}
export default Modal;
