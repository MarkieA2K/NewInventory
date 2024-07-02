import React, { createContext, useState, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from './supabase';

const initialState = {
  isLoggedIn: false,
  userSession: null,
  userLevel: null,
  userData: null,
  loading: false,
  error: '',
  username: '',
  password: '',
  checked: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.payload };
    case 'SET_USER_SESSION':
      return { ...state, userSession: action.payload };
    case 'SET_USER_LEVEL':
      return { ...state, userLevel: action.payload };
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CHECKED':
      return { ...state, checked: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getStoredCredentials = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedUsername && storedPassword) {
        dispatch({ type: 'SET_USERNAME', payload: storedUsername });
        dispatch({ type: 'SET_PASSWORD', payload: storedPassword });
        dispatch({ type: 'SET_CHECKED', payload: true });
      }
    } catch (error) {
      console.error('Error retrieving stored credentials:', error.message);
    }
  };

  useEffect(() => {
    getStoredCredentials();
  }, []);

  const login = async (username, password, rememberMe) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data, error } = await supabase
        .from('InventoryUsers')
        .select('*')
        .eq('User_Name', username)
        .eq('User_Password', password)
        .single();

      if (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Invalid credentials. Please try again.',
        });
        return false;
      } else if (data && data.User_ID !== '') {
        if (rememberMe) {
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
        }
        dispatch({ type: 'SET_USER_SESSION', payload: data.User_ID });
        dispatch({ type: 'SET_USER_LEVEL', payload: data.User_Level });
        dispatch({ type: 'SET_IS_LOGGED_IN', payload: true });
        dispatch({ type: 'SET_USER_DATA', payload: data });
        return true;
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Invalid credentials. Please try again.',
        });
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      dispatch({
        type: 'SET_ERROR',
        payload: 'An unexpected error occurred. Please try again later.',
      });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async () => {
    dispatch({ type: 'SET_IS_LOGGED_IN', payload: false });
    dispatch({ type: 'SET_USER_SESSION', payload: null });
    dispatch({ type: 'SET_USER_LEVEL', payload: null });
    dispatch({ type: 'SET_USER_DATA', payload: null });
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
