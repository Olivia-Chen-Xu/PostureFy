import { Button } from '@material-ui/core';
import React, {useState, useContext} from 'react';
import { useEffect } from 'react';
import {ReminderContext} from './Context';


const ReminderForm = () => {
    const { reminders, currentId, dispatch } = useContext(ReminderContext);
    const [formData, setFormData] = useState({ toDo: '', frequency: ''})
    const reminder = reminders.find(r => r.id === currentId);

    useEffect(() => {
        if (reminder) setFormData(reminder)
    }, [reminder])

    const clear = () => {
        setFormData({ toDo: '', frequency: ''})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!currentId){
            console.log({...formData, modifiedTime: Date.now()})
            dispatch({ type: 'ADD_REMINDER', reminder: {...formData, modifiedTime: Date.now()}})
            clear()
        } else {
            console.log({...formData, modifiedTime: Date.now()})
            console.log(currentId)
            dispatch({ type: 'UPDATE_REMINDER', reminder: {...formData, modifiedTime: Date.now()}})
            clear()
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Reminder me to</p>
                <input type="text" placeholder="(ex. Drink Water)" value={formData.toDo}
                onChange={(e) => setFormData({...formData, toDo: e.target.value})} required />
                <p>Every</p>
                <input type="text" placeholder="(ex. 30)" value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})} required />
                <p>Minutes</p>
                <input type="submit" value="Set Reminder" />
            </form>
        </div>
    );
};

export default ReminderForm;