import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TYPES_RESORUCES } from "../../data/data";
import { borrowBook, fetchAvailableBooks, fetchAvailableStudents, returnBook } from "../../API/apiCalls";
import FormContext from "../../context/form-context";
import StudentsContext from "../../context/students-context";
import BooksContext from "../../context/books-context";

const BookRentForm = () => {

    const { id } = useParams();
    const { selectedItem, toggleModal, itemType } = useContext(FormContext);
    const {setAvailableStudents, availableStudents, updateStudent} = useContext(StudentsContext);
    const {setAvailableBooks, availableBooks, updateBook} = useContext(BooksContext);

    const [selectedStudent, setSelectedStudent] = useState(itemType === TYPES_RESORUCES.STUDENTS ? selectedItem._id : null);
    const [selectedBook, setSelectedBook] = useState(itemType === TYPES_RESORUCES.BOOKS ? selectedItem._id : null);
    
    useEffect(() => {
        const fetchData = async () => {
            const students = await fetchAvailableStudents(id);
            if(students.length > 0){
                if(!selectedStudent){
                    setSelectedStudent(students[0]._id);
                }
                setAvailableStudents(students);
            } 
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const books = await fetchAvailableBooks(id);
            if(books.length > 0){
                if(!selectedBook){
                    setSelectedBook(books[0]._id);
                }
                setAvailableBooks(books);
            }
        }
        fetchData();
    }, [id]);
   
    const onSubmitHandler = async(e) => {
        e.preventDefault();
       
        toggleModal();
        let res = null;
        if(selectedItem.borrowed !== '-'){
            res = await returnBook(selectedItem._id);
        }
        else {
            res = await borrowBook(selectedBook, selectedStudent);
        }
        
        if(res){
            updateBook(res.book);
            console.log(res);
            if(res.student){
                updateStudent(res.student);
            }
        }
    }

    const handleSelectStudentChange = (e) => {
        setSelectedStudent(e.target.value);
    }
    const handleSelectBookChange = (e) => {
        setSelectedBook(e.target.value);
    }

    if(selectedItem.borrowed !== '-'){
        return (
            <form onSubmit={onSubmitHandler}>
            <h3 className="headline-3">Vr??ti?? knihu</h3>
            <>
                    <p>Ste si ist??, ??e chcete vr??ti?? knihu  <b>{selectedItem.title}</b>? </p>
                    <button className="btn" type="submit">Vr??ti??</button>
                </>
            </form>
        )
    }

    return (

        <form onSubmit={onSubmitHandler}>
            <h3 className="headline-3">Po??i??a?? knihu</h3>

            { availableBooks?.length === 0 && <p>Moment??lne nie je vo??n?? ??iadna kniha na po??i??anie!</p>}
            { availableStudents?.length === 0 && <p>Moment??lne nie je ??iadny ??tudent, komu by bolo mo??n?? po??i??a?? knihu!</p>}

            {availableBooks?.length > 0 && availableStudents?.length > 0  &&
                <>
                    <div className="flex-column">
                        <label htmlFor="title">N??zov knihy</label>
                        <select onChange={handleSelectBookChange} name="book" id="book" defaultValue={selectedBook} disabled={itemType === TYPES_RESORUCES.BOOKS} required>
                            {availableBooks.map((book) => (
                                <option key={book._id} value={book._id}>{book.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-column">
                        <label htmlFor="student">??tudent</label>
                        <select onChange={handleSelectStudentChange} name="student" id="student" defaultValue={selectedStudent} disabled={itemType === TYPES_RESORUCES.STUDENTS} required>
                            {availableStudents.map((student) => (
                                <option key={student._id} value={student._id}>{student.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="btn">Po??i??a??</button>
                    </div>
                </>
            }
        </form>
    );
}
export default BookRentForm;
