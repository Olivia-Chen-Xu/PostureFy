import React, { useState, createContext, useReducer, useEffect } from 'react';
import { reminderReducer } from './Reducer';

export const ReminderContext = createContext();

const ReminderContextProvider = (props) => {
    const [reminders, dispatch] = useReducer(reminderReducer, [], () => {
    const localData = localStorage.getItem('reminders');
    return localData ? JSON.parse(localData) : [];
  });

  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders, currentId]);

  return (
    <ReminderContext.Provider value={{ reminders, currentId, setCurrentId, dispatch }}>
      {props.children}
    </ReminderContext.Provider>
  );
}
 
export default ReminderContextProvider;