import { useReducer } from "react";

import FormContext from "./form-context";

const defaultState = {
    mode: '',
    modal: false,
    itemType: '',
    selectedItem: null
}

const formReducer = (state, action) => {
    if (action.type === 'TOGGLE_MODAL') {
        return { ...defaultState, modal: !state.modal, itemType: action.payload, mode: '' };
    }
    if (action.type === 'SELECT_ITEM') {
        return { ...defaultState, selectedItem: action.payload.item, modal: true, mode: action.payload.rent ? 'rent' : 'update', itemType: action.payload.itemType }
    }
    if (action.type === 'DELETE_ITEM') {
        return { ...defaultState, mode: 'delete', modal: true, selectedItem: action.payload.item, itemType: action.payload.itemType }
    }
    return defaultState;
}

const FormProvider = props => {
    const [formState, dispatchFormAction] = useReducer(
        formReducer, defaultState
    );

    const toggleModal = (itemType) => {
        dispatchFormAction({ type: 'TOGGLE_MODAL', payload: itemType })
    };
    const selectItem = (itemType, item, rent = false) => {
        console.log(item);
        dispatchFormAction({ type: 'SELECT_ITEM', payload: { itemType, item, rent } })
    }
    const deleteItem = (itemType, item) => {
        dispatchFormAction({ type: 'DELETE_ITEM', payload: { itemType, item } })
    }

    const formContext = {
        mode: formState.mode,
        modal: formState.modal,
        selectedItem: formState.selectedItem,
        itemType: formState.itemType,
        selectItem: selectItem,
        toggleModal: toggleModal,
        deleteItem: deleteItem,
    }
    return <FormContext.Provider value={formContext}>{props.children}</FormContext.Provider>
}

export default FormProvider;
