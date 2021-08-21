import { React, useState, useRef } from "react";
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';

const PostureDetector = () => {
    const URL = 'https://teachablemachine.withgoogle.com/models/xzUwKe94Z/';
    let model, webcam, canvas, ctx;
    canvas = useRef();
    const [start, setStart] = useState(false);
    const [outputs, setOutputs] = useState([])
    const canvasRef = useRef(null);

    async function init() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        // load the model and metadata
        // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
        model = await tmPose.load(modelURL, metadataURL);

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(600, 400, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        webcam.play();
        window.requestAnimationFrame(loop);
        
        ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;

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

    return (
        <div>
            <div>Teachable Machine Pose Model</div>           
            <div><button type='button' onClick={() => init()}>Start</button></div>
            <div><canvas ref={canvasRef} width="600" height="400"></canvas></div>
            {!start ? null : (
              <>
              <div>
              {outputs.map(output => <div>{`${output.className} + ${output.probability.toFixed(2)}`}</div>)}
              </div>
              </>
            )}
            
        </div>
    )
}

export default PostureDetector