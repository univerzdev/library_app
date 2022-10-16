import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { fetchLibraryBooks, fetchLibraryData, fetchLibraryStudents } from "../API/apiCalls";
import { TYPES_RESORUCES } from "../data/data";

import FormContext from "../context/form-context";
import LibraryBooks from "../components/LibraryBooks";
import LibraryStudents from "../components/LibraryStudents";
import ModalContent from "../components/UI/ModalContent";
import BooksContext from "../context/books-context";
import StudentsContext from "../context/students-context";
import LibrariesContext from "../context/libraries-context";

const LibraryDetail = () => {

    const { id } = useParams();
    const [library, setLibrary] = useState(null);
  
    const navigate = useNavigate();
    const {libraries} = useContext(LibrariesContext);
    const { selectItem, deleteItem } = useContext(FormContext);
    const { setBooks, books } = useContext(BooksContext);
    const { setStudents, students } = useContext(StudentsContext);

    useEffect(() => {
        const fetchData = async () => {
            const books = await fetchLibraryBooks(id);
            setBooks(books);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const library = await fetchLibraryData(id);
            setLibrary(library);
        }
        fetchData();
    }, [libraries]);
    useEffect(() => {
        const fetchData = async () => {
            const students = await fetchLibraryStudents(id);
            setStudents(students);
        }
        fetchData();
    }, [id]);
    return (
        <>
            <ModalContent />
           
            {
                books && students && library &&
                <>
                    <div className="my-container">
                    <button className="btn-back" onClick={() => navigate(-1)}>BACK</button>
                        <h1 className="headline-1">{library.title}</h1>
                        <div className="text-center mt-8">
                            <button className="btn-headline" type="button" onClick={() => selectItem(TYPES_RESORUCES.LIBRARIES, library)}>Upraviť knižnicu</button>
                            <button className="btn-headline-delete" type="button" onClick={() => deleteItem(TYPES_RESORUCES.LIBRARIES, library)}>Odstrániť knižnicu</button>
                        </div>

                        <LibraryBooks books={books} />
                        <LibraryStudents students={students} />
                    </div>
                </>
            }
        </>
    )
}
export default LibraryDetail;