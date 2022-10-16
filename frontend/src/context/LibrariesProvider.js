import { useReducer } from "react";

import LibrariesContext from "./libraries-context";
const defaultState = {
    libraries: [],
}

const libraryReducer = (state, action) => {
    if (action.type === 'SET_LIBRARIES') {
        return { libraries: action.payload};
    }
    if (action.type === 'CREATE_LIBRARY') {
        return { libraries: [action.payload, ...state.libraries] }
    }
    if (action.type === 'UPDATE_LIBRARY') {
        return {...state, libraries: state.libraries.map((library) => library._id === action.payload._id ? action.payload : library )}
    }
    if (action.type === 'DELETE_LIBRARY') {
        return { libraries: state.libraries.filter((library) => library._id !== action.payload._id)}
    }
    return state;
}

const LibrariesProvider = props => {
    const [libraryState, dispatchLibraryAction] = useReducer(
        libraryReducer, defaultState
    );

    const setLibraries = (libraries) => {
        dispatchLibraryAction({ type: 'SET_LIBRARIES', payload: libraries })
    }
    const createLibrary = (newLibrary) => {
        dispatchLibraryAction({ type: 'CREATE_LIBRARY', payload: newLibrary })
    };
    const updateLibrary = (library) => {
        if(library)
        dispatchLibraryAction({ type: 'UPDATE_LIBRARY', payload: library })
    };
    const deleteLibrary = (library) => {
        dispatchLibraryAction({ type: 'DELETE_LIBRARY', payload: library })
    }
    const librariesContext = {
        libraries: libraryState.libraries,
        createLibrary: createLibrary,
        updateLibrary: updateLibrary,
        deleteLibrary: deleteLibrary,
        setLibraries: setLibraries
    }
    return <LibrariesContext.Provider value={librariesContext}>{props.children}</LibrariesContext.Provider>
}

export default LibrariesProvider;
