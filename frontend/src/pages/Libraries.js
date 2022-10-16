import { useContext, useEffect } from "react";

import { fetchAllData } from "../API/apiCalls";
import { TYPES_RESORUCES } from "../data/data";

import LibrariesGrid from "../components/UI/Grid/LibrariesGrid";
import FormContext from "../context/form-context";
import LibrariesContext from "../context/libraries-context";
import ModalContent from "../components/UI/ModalContent";

const Libraries = () => {
    const { toggleModal } = useContext(FormContext);
    const { setLibraries, libraries } = useContext(LibrariesContext);
    useEffect(() => {
        const fetchData = async () => {
            const libraries = await fetchAllData('libraries');
            setLibraries(libraries);
        }
        fetchData();
    }, []);
    return (
        <>
            <ModalContent />
            <div className="my-container">
                <h1 className="headline-1">Zvoľte knižnicu, ktorú chcete spravovať</h1>
                <button onClick={() => toggleModal(TYPES_RESORUCES.LIBRARIES)} className="btn">Vytvoriť novú knižnicu</button>
                <LibrariesGrid data={libraries} />
            </div>
        </>
    )
}
export default Libraries;