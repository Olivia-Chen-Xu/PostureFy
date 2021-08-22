import { React, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

import Button from "@material-ui/core/Button";
import { variable } from "@tensorflow/tfjs";

const StretchingInstructor = () => {
  const URL = "https://teachablemachine.withgoogle.com/models/xzUwKe94Z/";
  let model, webcam, canvas, ctx;
  canvas = useRef();
  const [start, setStart] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const canvasRef = useRef(null);

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    model = await tmPose.load(modelURL, metadataURL);

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(800, 600, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    webcam.play();
    window.requestAnimationFrame(loop);

    ctx = canvasRef.current ? canvasRef.current.getContext("2d") : null;

    // append/get elements to the DOM
    setStart(true);
    //     labelContainer = React.createRef();
    //     for (let i = 0; i < maxPredictions; i++) { // and class labels
    //         labelContainer.appendChild(document.createElement('div'));
    //     }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    await loadTime();
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

  function loadTime() {
    setInterval(() => {
      setOutputs(
        outputs.map((output) => {
          var newTime = output.totalTime ? output.totalTime : 0;
          if (output.probability > 0.7) {
            newTime += 10;
          }
          return { ...output, totalTime: newTime };
        })
      );
    }, 10);
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

  return (
    <div className="postureViewContainer">
      <div className="teachableMachineTitle">
        <h3>Teachable Machine Pose Model</h3>
      </div>
      {!start && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            init();
            loadTime();
          }}
        >
          Start
        </Button>
      )}
      {/* <div>Teachable Machine Pose Model</div>           
            <Button variant="contained" color="primary" onClick={() => init()}>Start</Button> */}
      <div>
        <canvas ref={canvasRef} width="800" height="600"></canvas>
      </div>
      {!start ? null : (
        <>
          <div className="classProbabilitiesContainer">
            {outputs.map((output) => (
              <div>{`${output.className} = ${output.probability.toFixed(
                2
              )} time ${output.totalTime}`}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StretchingInstructor;
