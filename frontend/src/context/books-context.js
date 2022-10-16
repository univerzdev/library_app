import React from 'react';

const BooksContext = React.createContext({
    books: [],
    availableBooks: [],
    setBooks: (books) => {},
    createBook: (book) => {},
    updateBook: (book) => {},
    deleteBook: (book) => {},
});

export default BooksContext;