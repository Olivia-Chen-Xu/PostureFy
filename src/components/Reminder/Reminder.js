import React from 'react';
import ReminderContextProvider from './Context';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';

const Reminder = () => {
    return (
        <div>
            <ReminderContextProvider>
                <ReminderForm />
                <ReminderList />
            </ReminderContextProvider>
        </div>
    );
};

export default Reminder;