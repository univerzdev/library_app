import React from 'react';

/* Context for handling modal state and display options of forms */
const FormContext = React.createContext({
    mode: '',
    modal: false,
    selectedItem: null,
    itemType: '',
    toggleModal: (itemType) => {},
    selectItem: (item) => {},
    deleteItem: (item) => {}
});

export default FormContext;