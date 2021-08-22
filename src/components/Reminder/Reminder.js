import { Container, Grid } from "@material-ui/core";
import React from "react";
import ReminderContextProvider from "./Context";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";

const Reminder = () => {
  return (
    <ReminderContextProvider>
      <ReminderForm />
      <ReminderList />
    </ReminderContextProvider>
  );
};

export default Reminder;
