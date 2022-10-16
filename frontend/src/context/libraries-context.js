import React from 'react';

const LibrariesContext = React.createContext({
    libraries: [],
    availableLibraries: [],
    setLibraries: (libraries) => {},
    createLibrary: (library) => {},
    updateLibrary: (library) => {},
    deleteLibrary: (library) => {}
});

export default LibrariesContext;