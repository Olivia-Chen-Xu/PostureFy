import { Button, Card } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { ReminderContext } from "./Context";
import { toast } from "react-toastify";

toast.configure();
const ReminderItem = ({ reminder }) => {
  const { setCurrentId, dispatch } = useContext(ReminderContext);

  useEffect(() => {
    const interval = window.setInterval(() => {
      console.log("notification sent!", reminder.id);
      showNotification(reminder);
      //   toast(reminder.toDo);
    }, reminder.frequency * 60000);
    return () => {
      console.log("notification removed", reminder.id);
      window.clearInterval(interval);
    };
  }, [reminder]);

  function showNotification(reminder) {
    new Notification(reminder.toDo);
  }

  return (
    <Card>
      <div>{`${reminder.toDo} every ${reminder.frequency} minute(s)`}</div>
      <Button onClick={() => setCurrentId(reminder.id)}>Edit</Button>
      <Button
        onClick={() => dispatch({ type: "REMOVE_REMINDER", id: reminder.id })}
      >
        Delete
      </Button>
    </Card>
  );
};

const ReminderList = () => {
  const { reminders } = useContext(ReminderContext);

  return (
    <div>
      {reminders.map((reminder) => {
        return (
          <ReminderItem reminder={reminder} key={reminder.id}></ReminderItem>
        );
      })}
    </div>
  );
};

export default ReminderList;
