import { v4 as uuid} from 'uuid';

export const reminderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REMINDER':
      return [...state, {
        toDo: action.reminder.toDo, 
        frequency: action.reminder.frequency.parseInt(),
        modifiedTime: action.reminder.modifiedTime, 
        id: uuid()}
      ];
    case 'UPDATE_REMINDER':
      return state.map(reminder => (reminder.id === action.id ? action.reminder : reminder))
    case 'REMOVE_REMINDER':
      return state.filter(reminder => reminder.id !== action.id);
    default:
      return state;
  }
} 