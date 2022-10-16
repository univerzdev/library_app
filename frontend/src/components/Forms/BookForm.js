import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";

import { TYPES_RESORUCES } from "../../data/data";
import { createNewObject, updateObject } from "../../API/apiCalls";
import FormContext from "../../context/form-context";
import StudentsContext from "../../context/students-context";
import BooksContext from "../../context/books-context";

const BookForm = () => {
    const titleRef = useRef();
    const yearRef = useRef();
    const isbnRef = useRef();
    const { createBook, updateBook } = useContext(BooksContext);
    const { replaceBookData, students } = useContext(StudentsContext);
    const { id } = useParams();
    const { selectedItem, mode, toggleModal } = useContext(FormContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        toggleModal();
        if (mode === '') {
            const book = {
                title: titleRef.current.value,
                year: yearRef.current.value,
                isbn: isbnRef.current.value,
                library: id
            }
            const newBook = await createNewObject(TYPES_RESORUCES.BOOKS, book);
            if (newBook) {
                createBook(newBook);
            }
        }
        else {
            const book = {
            };
            if (titleRef.current.value !== selectedItem.title) {
                book['title'] = titleRef.current.value;
            }
            if (yearRef.current.value !== selectedItem.year) {
                book['year'] = yearRef.current.value;
            }
            if (isbnRef.current.value !== selectedItem.isbn) {
                book['isbn'] = isbnRef.current.value;
            }
            const res = await updateObject(TYPES_RESORUCES.BOOKS, selectedItem._id, book);
            if (res) {
                updateBook(res);
                replaceBookData(res);
            }
        }
    }
    console.log(students);
    return (

        <form onSubmit={onSubmitHandler}>
            <h3 className="headline-3">{selectedItem ? "Upraviť knihu" : "Vytvoriť novú knihu"}</h3>

            <div className="flex-column">
                <label htmlFor="title">Názov knihy</label>
                <input ref={titleRef} className="input" type="text" id="title" defaultValue={selectedItem?.title} required />
            </div>
            <div className="flex-column">
                <label htmlFor="year">Rok</label>
                <input ref={yearRef} className="input" type="number" id="year" defaultValue={selectedItem?.year} required />
            </div>
            <div className="flex-column">
                <label htmlFor="isbn">ISBN</label>
                <input ref={isbnRef} className="input" type="text" id="isbn" defaultValue={selectedItem?.isbn} required />
            </div>
            <div>
                <button type="submit" className="btn">{selectedItem ? "Potvrdiť" : "Vytvoriť knihu"}</button>
            </div>
        </form>
    );
}

export default BookForm;
