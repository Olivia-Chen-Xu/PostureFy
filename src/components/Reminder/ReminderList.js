import { Button, Card } from '@material-ui/core';
import React, { useContext } from 'react';
import {ReminderContext} from './Context';

const ReminderList = () => {
    const { reminders, setCurrentId, dispatch } = useContext(ReminderContext);

    return (
        <div>
            {reminders.map(reminder => {
                return(
                    <Card>
                        <div>{`${reminder.toDo} every ${reminder.frequency} minute(s)`}</div>
                        <Button onClick={() => setCurrentId(reminder.id)}>Edit</Button>
                        <Button onClick={() => dispatch({ type: 'REMOVE_REMINDER', id: reminder.id})}>Delete</Button>
                    </Card>
                )
            })}
        </div>
    );
};

export default ReminderList;