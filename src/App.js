// ---------- Cursor Parking Lot <3 ---------- //
//                                             //
//                                             //
// ------------------------------------------- //

import './App.css';
import { BrowserRouter, Switch, Route, useHistory, Link } from "react-router-dom";
import Reminder from "./components/Reminder";
import PostureDetector from "./components/PostureDetector";
import StretchingInstructor from "./components/StrechingInstructor";
import { makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import img1 from "./undraw_reminder_pa79.svg";

const useStyles = makeStyles({
  main:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  card: {
    display: "relative",
    width: 350,
    margin: 20,
    justifyContent: "center"
  },
  media: {
    objectFit: "contain",
  },
});


function App() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <BrowserRouter>
      <div>
        <h1>Our Web Name</h1>
        <div className={classes.main}>
          <Card className={classes.card} component={Link} to="/reminder">
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">Break Reminder</Typography>
                <CardMedia className={classes.media} src={img1} component="img"></CardMedia>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card} component={Link} to="/posture-detector">
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">Break Reminder</Typography>
                <CardMedia className={classes.media} src={img1} component="img"></CardMedia>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">Break Reminder</Typography>
                <CardMedia className={classes.media} src={img1} component="img"></CardMedia>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
      <Switch>
        <Route path="/reminder" exact component={Reminder} />
        <Route path="/posture-detector" exact component={PostureDetector} />
        <Route path="/streching=instructor" exact component={StretchingInstructor} />
      </Switch>      
    </BrowserRouter>
    
  );
}

export default App;
