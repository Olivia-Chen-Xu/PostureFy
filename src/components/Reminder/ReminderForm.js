import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { ReminderContext } from "./Context";

const ReminderForm = () => {
  const { reminders, currentId, setCurrentId, dispatch } =
    useContext(ReminderContext);
  const [formData, setFormData] = useState({ toDo: "", frequency: "" });
  const reminder = reminders.find((r) => r.id === currentId);

  useEffect(() => {
    if (reminder) setFormData(reminder);
  }, [reminder]);

  const clear = () => {
    setFormData({ toDo: "", frequency: "" });
    setCurrentId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentId) {
      console.log({ ...formData, modifiedTime: Date.now() });
      dispatch({
        type: "ADD_REMINDER",
        reminder: { ...formData, modifiedTime: Date.now() },
      });
      clear();
    } else {
      console.log(currentId);
      dispatch({
        type: "UPDATE_REMINDER",
        reminder: { ...formData, modifiedTime: Date.now() },
      });
      clear();
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          {" "}
          <Typography variant="h6">
            Reminder me to
            <TextField
              size="small"
              variant="outlined"
              label="(ex. Drink Water)"
              value={formData.toDo}
              onChange={(e) =>
                setFormData({ ...formData, toDo: e.target.value })
              }
              required
            />
            every
            <TextField
              size="small"
              variant="outlined"
              label="(ex. 30)"
              value={formData.frequency}
              onChange={(e) =>
                setFormData({ ...formData, frequency: e.target.value })
              }
              required
            />
            minute(s)
          </Typography>
        </div>

        <div>
          <Button variant="contained" type="submit">
            Set Reminder
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReminderForm;
