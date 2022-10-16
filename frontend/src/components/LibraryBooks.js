import { useContext } from "react";
import { TABLE_BOOKS_FIELDS, TYPES_RESORUCES } from "../data/data";
import FormContext from "../context/form-context";
import Table from "./UI/Table";
import { dateFormatSK, endDateFormatSK, isDateExpired } from "../data/helpers";

const LibraryBooks = (props) => {
    const {books} = props;
    const formCtx = useContext(FormContext);
    const BOOKS_TABLE_ACTIONS = [
        {
            onClick: (item) => formCtx.selectItem(TYPES_RESORUCES.BOOKS, item),
            text: 'Upraviť',
            hiddenClasses: "bg-blue-300"
        },
        {
            onClick: (item) => formCtx.selectItem(TYPES_RESORUCES.BOOKS, item, true),
            text: 'Požičať',
            hiddenClasses: "bg-blue-800"
        },
        {
            onClick: (item) => formCtx.selectItem(TYPES_RESORUCES.BOOKS, item, true),
            text: 'Vrátiť',
            hiddenClasses: "bg-yellow-800"
        },
        {
            onClick: (item) => formCtx.deleteItem(TYPES_RESORUCES.BOOKS, item),
            text: 'Odstrániť',
            hiddenClasses: "bg-red-500"
        }

    ];
    let filteredBooks = [];
    books.forEach(book => {
        let { title, _id, borrowed, isbn, year, timeFrom } = book;
        filteredBooks.push({
            _id,
            title,
            year,
            isbn,
            borrowed: borrowed ? 'Požičaná' : '-',
            time: timeFrom ? dateFormatSK(timeFrom) : '-',
            timeTo: timeFrom ? endDateFormatSK(timeFrom) : '-',
            hiddenClasses: borrowed ? (isDateExpired(timeFrom) ? 'bg-red-500' : '') : "bg-green-100"
        })
    });


    return (
        <>
            <h2 className="headline-table">Knihy</h2>
            <button onClick={() => formCtx.toggleModal(TYPES_RESORUCES.BOOKS)} className="btn">Vytvoriť novú knihu</button>
            <Table fields={TABLE_BOOKS_FIELDS} data={filteredBooks} actions={BOOKS_TABLE_ACTIONS} />
        </>

    );
}

export default LibraryBooks;