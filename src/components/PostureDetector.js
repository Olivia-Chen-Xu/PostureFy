import { React, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

import Button from "@material-ui/core/Button";
import { Chronometer } from "./Chronometer";

const PostureDetector = () => {
  const URL = "https://teachablemachine.withgoogle.com/models/Onp2Xijek/";
  let model, webcam, canvas, ctx;
  canvas = useRef();
  const [start, setStart] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [chronometerShown, setChronometerShown] = useState(false);
  const [triggerNotification, setTriggerNotification] = useState(false);
  const canvasRef = useRef(null);

  function componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }

  function showNotification(notificationOptions) {
    var options = {
      body: notificationOptions.body,
      icon: notificationOptions.icon,
      dir: notificationOptions.dir,
    };
    new Notification(notificationOptions.title, options);
    setTriggerNotification(false);
  }

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    componentDidMount();

    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    model = await tmPose.load(modelURL, metadataURL);

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(600, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    webcam.play();
    window.requestAnimationFrame(loop);

    ctx = canvasRef.current ? canvasRef.current.getContext("2d") : null;

    // append/get elements to the DOM
    setStart(true);

    // outputPredictions(outputs);
    //     labelContainer = React.createRef();
    //     for (let i = 0; i < maxPredictions; i++) { // and class labels
    //         labelContainer.appendChild(document.createElement('div'));
    //     }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    setOutputs(prediction);

    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }

  function outputPredictions(outputs) {
    var div = document.getElementById("classProbabilitiesContainer");

    if (div != null) {
      while (div.firstChild) div.removeChild(div.firstChild);
    }

    for (var i = 0; i < outputs.length; i++) {
      var innerHTML = document.getElementById(
        "classProbabilitiesContainer"
      ).innerHTML;
      document.getElementById("classProbabilitiesContainer").innerHTML =
        innerHTML +
        "<div> Posture: " +
        outputs[i].className +
        " Probability: " +
        outputs[i].probability.toFixed(2) +
        "</div>";
    }

    if (outputs.length === 9) {
      if (outputs[6].probability.toFixed(2) <= 0.3 && !chronometerShown) {
        setChronometerShown(true);
      } else if (outputs[6].probability.toFixed(2) > 0.3 && chronometerShown) {
        setChronometerShown(false);
      }
    }
  }

  return (
    <div className="postureViewContainer">
      <div className="teachableMachineTitle">
        <h3>AI Posture Detector</h3>
      </div>
      {!start && (
        <Button variant="contained" color="primary" onClick={() => init()}>
          Start
        </Button>
      )}
      {/* <div>Teachable Machine Pose Model</div>           
            <Button variant="contained" color="primary" onClick={() => init()}>Start</Button> */}
      <div>
        <canvas ref={canvasRef} width="600" height="400"></canvas>
      </div>
      {!start ? null : (
        <>
          <div
            id="classProbabilitiesContainer"
            className="classProbabilitiesContainer"
          >
            {/* {outputs.map(output => <div>{`${output.className} + ${output.probability.toFixed(2)}`}</div>)} */}

            {outputPredictions(outputs)}
          </div>

          <div>
            {chronometerShown && (
              <Chronometer
                onTriggerNotification={() => setTriggerNotification(true)}
              />
            )}

            {triggerNotification &&
              showNotification({
                title: "Bad Posture Detected",
                body: "You are currently sitting with bad posture, be sure to sit up straight :)",
                icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                dir: "ltr",
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default PostureDetector;
