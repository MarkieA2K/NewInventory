import React, { createContext, useReducer } from 'react';
import supabase from './supabase'; // Adjust import path as necessary

const initialState = {
  inventoryData: [],
  selectedItem: null, // Change to an array
  modalVisible: false,
  successModalVisible: false,
  refreshing: false,
  borrowButtonDisabled: false,
  borrowLoading: false,
  formVisible: false,
  inputID: null,
  inputName: null,
  inputBrand: null,
  inputModel: null,
  inputDesc: null,
  inputQuantity: null,
  showError: false,
  modalMode: null,
  inputCategory: null,
  inputSubCategory: null,
  inputFacility: null,
  disabled: false,
  errorMsg: null,
  delDisable: false,
  selectedCategory: null,
  selectedFacility: null,
  showDropDown: false,
  image: null,
  inputImage: '',
  imageID: '',
};

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVENTORY_DATA':
      return { ...state, inventoryData: action.payload };
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItem: action.payload }; // Update selected items
    case 'SET_MODAL_VISIBLE':
      return { ...state, modalVisible: action.payload }; // Update selected items
    case 'SET_FORM_VISIBLE':
      return { ...state, formVisible: action.payload }; // Update selected items
    default:
      return state;
  }
};

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const fetchInventoryData = async () => {
    try {
      let query = supabase.from('InventoryList').select('*');
      if (state.selectedCategory) {
        query = query.eq('Item_Category', state.selectedCategory);
      }
      if (state.selectedFacility) {
        query = query.eq('Item_Facility', state.selectedFacility);
      }
      const { data, error } = await query;

      if (error) {
        console.error('Error fetching inventory data:', error);
      } else {
        dispatch({ type: 'SET_INVENTORY_DATA', payload: data });
      }
    } catch (error) {
      console.error('Error fetching inventory data:', error.message);
    }
  };

  const setSelectedItem = async (item) => {
    await dispatch({ type: 'SET_SELECTED_ITEM', payload: item });
    dispatch({ type: 'SET_MODAL_VISIBLE', payload: true });
  };
  const setFormVisible = async () => {
    dispatch({ type: 'SET_FORM_VISIBLE', payload: true });
  };

  const closeModal = () => {
    dispatch({ type: 'SET_MODAL_VISIBLE', payload: false });
    dispatch({ type: 'SET_SELECTED_ITEM', payload: null });
  };

  return (
    <InventoryContext.Provider
      value={{
        state,
        dispatch,
        fetchInventoryData,
        setSelectedItem,
        closeModal,
        setFormVisible,
      }} // Expose setSelectedItem
    >
      {children}
    </InventoryContext.Provider>
  );
};
