import { useContext, useRef } from "react";

import FormContext from "../../context/form-context";
import { createNewObject, updateObject } from "../../API/apiCalls";
import { TYPES_RESORUCES } from "../../data/data";
import LibrariesContext from "../../context/libraries-context";

const LibraryForm = () => {
    const {mode, selectedItem, toggleModal }= useContext(FormContext);
    const titleRef = useRef();

    const {createLibrary, updateLibrary} = useContext(LibrariesContext);
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const library = {
            title: titleRef.current.value,
        }
        toggleModal();
        if (mode === '') {
            const newLibrary = await createNewObject(TYPES_RESORUCES.LIBRARIES,library);
            if(newLibrary){
                createLibrary(newLibrary);
            }
        }
        else {
            const updatedLibrary = await updateObject(TYPES_RESORUCES.LIBRARIES,selectedItem._id,library);
            if(updatedLibrary){
                updateLibrary(updatedLibrary);
            }

        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <h3 className="headline-3">{selectedItem ? "Upraviť knižnicu" : "Vytvoriť novú knižnicu"}</h3>
            <div className="flex-column">
                <label htmlFor="title">Názov knižnice</label>
                <input ref={titleRef} className="input" type="text" id="title" required defaultValue={selectedItem && selectedItem.title} />
            </div>
            <div>
                <button className="btn" type="submit">Vytvoriť</button>
            </div>
        </form>
    );
}

export default LibraryForm;
