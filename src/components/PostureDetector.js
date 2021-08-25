import { React, useState, useRef, useEffect } from "react";
import * as tmPose from "@teachablemachine/pose";
import Button from "@material-ui/core/Button";

const URL = "https://teachablemachine.withgoogle.com/models/Onp2Xijek/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
// let webcam, model, maxPredictions;

let model;

async function init() {
  // Setups camera and the library

  const webcam = new tmPose.Webcam(200, 200, true); // width, height, flip
  await webcam.setup(); // request access to the webcam
  webcam.play();
  model = await tmPose.load(modelURL, metadataURL);
  //maxPredictions = model.getTotalClasses();

  return webcam;
}

async function predict(webcam) {
  // [{ className: String, probability: Number }]
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const predictions = await model.predict(posenetOutput);
  return [pose, predictions];
}

export default function Component() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(null);
  const canvasElement = useRef();
  const webcam = useRef();

  useEffect(() => {
    if (loading === true) {
      init().then((result) => {
        webcam.current = result;
        setLoading(false);
      });
    } else if (loading === false) {
      let mounted = true;
      const handler = async () => {
        webcam.current.update();
        setPredictions(await predict(webcam.current)[1]);
        const ctx = canvasElement.current.getContext("2d");
        ctx.drawImage(webcam.current.canvas, 0, 0);
        if (mounted) {
          window.requestAnimationFrame(handler);
        }
      };

      window.requestAnimationFrame(handler);

      return () => {
        mounted = false;
      };
    }
  }, [webcam, loading]);

  useEffect(() => {
    if (webcam.current) {
      const pose = predict(webcam.current)[0];
      if (pose) {
        const minPartConfidence = 0.5;
        const ctx = canvasElement.current.getContext("2d");
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }, [predictions]);

  // if (loading === true) {
  //   return <h1>Loading...</h1>;
  // }

  // if (loading === null) {
  //   return (
  //     <div>
  //       <h1>Let's start</h1>
  //       <button onClick={() => setLoading(true)}>Start</button>
  //     </div>
  //   );
  // }

  return (
    <div>
      {loading === null && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setLoading(true);
          }}
        >
          Start
        </Button>
      )}
      <canvas ref={canvasElement} width="800" height="600" />
      <ul>
        {!predictions
          ? null
          : predictions.map((prediction, i) => {
              return (
                <li key={i}>
                  {prediction.className} is {prediction.probability}
                </li>
              );
            })}
      </ul>
    </div>
  );
}
