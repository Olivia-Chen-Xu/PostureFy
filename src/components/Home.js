import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import img1 from "./undraw_Personal_settings_re_i6w4.svg";
import img2 from "./undraw_programming_2svr.svg";
import img3 from "./undraw_yoga_248n.svg";


const Home = () => {
    
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
            height: 200,
            objectFit: "contain",
            marginTop: 40,
            marginBottom: 40
        },
      });
    
    const classes = useStyles();

    return (
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
                <Typography variant="h5">AI Posture Detector</Typography>
                <CardMedia className={classes.media} src={img2} component="img"></CardMedia>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card} component={Link} to="/streching-instructor">
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">AI Stretching Instructor</Typography>
                <CardMedia className={classes.media} src={img3} component="img"></CardMedia>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
    );
};

export default Home;