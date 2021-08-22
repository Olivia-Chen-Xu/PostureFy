import { Button, Card, Typography } from "@material-ui/core";
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
    <Card style={{ marginLeft: 50, marginRight: 50, padding: 10 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          style={{ marginLeft: 20 }}
          variant="h6"
        >{`${reminder.toDo} every ${reminder.frequency} minute(s)`}</Typography>
        <Button
          style={{ marginLeft: 50 }}
          variant="outlined"
          color="primary"
          onClick={() => setCurrentId(reminder.id)}
        >
          Edit
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="outlined"
          color="secondary"
          onClick={() => dispatch({ type: "REMOVE_REMINDER", id: reminder.id })}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

const ReminderList = () => {
  const { reminders } = useContext(ReminderContext);

  return (
    <div>
      <h2 style={{ marginLeft: 50 }}>My Reminders</h2>
      {!reminders.length ? (
        <p style={{ margin: 50 }}>No reminders</p>
      ) : (
        reminders.map((reminder) => {
          return (
            <ReminderItem reminder={reminder} key={reminder.id}></ReminderItem>
          );
        })
      )}
    </div>
  );
};

export default ReminderList;
