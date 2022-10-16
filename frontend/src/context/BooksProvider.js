import { useReducer } from "react";

import BooksContext from "./books-context";

const defaultState = {
    books: [],
    availableBooks: []
}

const bookReducer = (state, action) => {
    if (action.type === 'SET_BOOKS') {
        return { ...state, books: action.payload};
    }
    if (action.type === 'SET_AVAILABLE_BOOKS') {
        return { ...state, availableBooks: action.payload};
    }
    if (action.type === 'CREATE_BOOK') {
        return { ...state, books: [action.payload, ...state.books] }
    }
    if (action.type === 'UPDATE_BOOK') {
        return { ...state, books: state.books.map((book) => book._id === action.payload._id ? action.payload : book )}
    }
    if (action.type === 'DELETE_BOOK') {
        return { ...state, books: state.books.filter((book) => book._id !== action.payload._id)}
    }
    return state;
}

const BooksProvider = props => {
    const [bookState, dispatchBookAction] = useReducer(
        bookReducer, defaultState
    );

    const setBooks = (books) => {
        dispatchBookAction({ type: 'SET_BOOKS', payload: books })
    }
    const setAvailableBooks = (books) => {
        dispatchBookAction({ type: 'SET_AVAILABLE_BOOKS', payload: books })
    }
    const createBook = (newBook) => {
        dispatchBookAction({ type: 'CREATE_BOOK', payload: newBook })
    };
    const updateBook = (book) => {
        if(book)
        dispatchBookAction({ type: 'UPDATE_BOOK', payload: book })
    };
    const deleteBook = (book) => {
        dispatchBookAction({ type: 'DELETE_BOOK', payload: book })
    }

    const booksContext = {
        books: bookState.books,
        availableBooks: bookState.availableBooks,
        createBook: createBook,
        updateBook: updateBook,
        deleteBook: deleteBook,
        setBooks: setBooks,
        setAvailableBooks: setAvailableBooks
    }
    return <BooksContext.Provider value={booksContext}>{props.children}</BooksContext.Provider>
}

export default BooksProvider;
