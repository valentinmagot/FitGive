import React, { useEffect, useState } from "react"
import * as posenet from "@tensorflow-models/posenet"
import * as tfjs from '@tensorflow/tfjs';

import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

function getPartPosition(pose, part) {
    pose = pose.keypoints
    var obj = pose.find(o => o.part === part);
    if (obj.score > 0.1) {
        return obj.position
    } else {
        return null;
    }
}

class Automatic extends React.Component {

    static defaultProps = {
        videoWidth: 800,
        videoHeight: 600,
        flipHorizontal: true,
        showVideo: true,
        showSkeleton: true,
        minPoseConfidence: 0.1,
        minPartConfidence: 0.5,
        maxPoseDetections: 2,
        nmsRadius: 20,
        outputStride: 16,
        imageScaleFactor: 0.5,
        skeletonColor: '#ffadea',
        skeletonLineWidth: 6,
    }

    constructor(props) {
        super(props);
        this.state = {
            t1: performance.now(),
            ready: false,
            loading: true,
            jumpingKeyPos: 0,
            jumpingJackReps: 0,
            hkdist: 0,
            thighLen: 0,
            angle: 0,
            torsoSize: 0,
            lowest: 10000000000,
            pxHeight: 0,
            animation: null,
            running: true,
            showPoints: true,
        }

        this.finishWorkout = this.finishWorkout.bind(this);
    }

    getCanvas = elem => {
        this.canvas = elem
    }

    getVideo = elem => {
        this.video = elem
    }

    async componentDidMount() {
        try {
            await this.setupCamera()
        } catch (error) {
            throw new Error(
                'This browser does not support video capture, or this device does not have a camera'
            )
        }

        try {
            this.posenet = await posenet.load()
        } catch (error) {
            throw new Error('PoseNet failed to load')
        } finally {
            setTimeout(() => {
                this.setState({ loading: false })
            }, 200)
        }
        this.detectPose()
    }

    async setupCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available'
            )
        }
        const { videoWidth, videoHeight } = this.props
        const video = this.video
        video.width = videoWidth
        video.height = videoHeight

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: 'user',
                width: videoWidth,
                height: videoHeight
            }
        })

        video.srcObject = stream

        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                video.play()
                resolve(video)
            }
        })
    }

    detectPose() {
        const { videoWidth, videoHeight } = this.props
        const canvas = this.canvas
        const canvasContext = canvas.getContext('2d')

        canvas.width = videoWidth
        canvas.height = videoHeight

        this.poseDetectionFrame(canvasContext)
    }

    drawPoint(canvasContext, x, y, radius = 3, color = "chartreuse") {
        canvasContext.beginPath();
        canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
        canvasContext.fillStyle = color;
        canvasContext.fill();
        canvasContext.fillStyle = 'black';
    }

    drawSegment(canvasContext, [ax, ay], [bx, by], lineWidth = 3, color = "chartreuse") {
        canvasContext.beginPath();
        canvasContext.moveTo(ax, ay);
        canvasContext.lineTo(bx, by);
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = color;
        canvasContext.stroke();
    }

    distance([ax, ay], [bx, by]) {
        return Math.hypot(ax - bx, ay - by);
    }

    poseDetectionFrame(canvasContext) {
        const {
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            minPartConfidence,
            videoWidth,
            videoHeight,
            showVideo,
            showPoints,
            showSkeleton,
        } = this.props

        const posenetModel = this.posenet
        const video = this.video

        const findPoseDetectionFrame = async () => {

            const pose = await posenetModel.estimateSinglePose(
                video,
                imageScaleFactor,
                flipHorizontal,
                outputStride
            )

            canvasContext.clearRect(0, 0, videoWidth, videoHeight)

            if (showVideo) {
                canvasContext.save()
                canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
                canvasContext.restore()
            }

            var pos = {
                lhip: getPartPosition(pose, "leftHip"),
                rhip: getPartPosition(pose, "rightHip"),
                lknee: getPartPosition(pose, "leftKnee"),
                rknee: getPartPosition(pose, "rightKnee"),
                lshoulder: getPartPosition(pose, "leftShoulder"),
                rshoulder: getPartPosition(pose, "rightShoulder"),
                lankle: getPartPosition(pose, "leftAnkle"),
                rankle: getPartPosition(pose, "rightAnkle"),
                eye: getPartPosition(pose, "rightEye")
            }
            if (!pos.lhip || !pos.rhip || !pos.lknee || !pos.rknee || !pos.lshoulder || !pos.rshoulder || !pos.rankle || !pos.lankle || !pos.eye) {
                this.setState({ ready: false });
            } else if (!this.state.ready) {
                // sets these only once (when you stand in front of the camera)
                this.setState({ ready: true });
                this.setState({ thighLen: Math.abs(pos.rhip.y - pos.rknee.y) })
                this.setState({ pxHeight: Math.abs(pos.eye.y - pos.rankle.y) })
            }
            if (this.state.ready) {
                var hipKneeDist = Math.abs(pos.rhip.y - pos.rknee.y)
                var newTorsoSize = Math.abs(pos.rshoulder.x - pos.lshoulder.x);
                if (Math.abs(newTorsoSize - this.state.torsoSize) / this.state.torsoSize > 0.3) {
                    this.setState({ torsoSize: newTorsoSize });
                    this.setState({ thighLen: Math.abs(pos.rhip.y - pos.rknee.y) })
                    this.setState({ pxHeight: Math.abs(pos.eye.y - pos.rankle.y) })
                }
                this.setState({ hkdist: hipKneeDist });
                const rightPosition = [pos.rankle.x, pos.rankle.y];
                const leftPosition = [pos.lankle.x, pos.lankle.y];
                const midpointHips = [(pos.lhip.x + pos.rhip.x) / 2, (pos.lhip.y + pos.rhip.y) / 2];
                const a = this.distance(midpointHips, rightPosition);
                const b = this.distance(midpointHips, leftPosition);
                this.setState({
                    angle: Math.acos(
                        (Math.pow(this.distance(leftPosition, rightPosition), 2) - Math.pow(a, 2) - Math.pow(b, 2))
                        / (-2 * a * b)
                    ) * 180. / Math.PI
                });
                this.setState({ lowest: Math.min(this.state.lowest, Math.abs(pos.eye.y - pos.rankle.y)) })
                switch (this.state.jumpingKeyPos) {
                    case 0:
                        if (this.state.angle >= 35) {
                            this.setState({ jumpingKeyPos: 1 });
                        }
                        break;
                    case 1:
                        if (this.state.angle <= 15) {
                            this.setState({ jumpingKeyPos: 0 });
                            this.setState({ jumpingJackReps: this.state.jumpingJackReps + 1 });

                            this.setState({ lowest: 10000000000 });
                        }
                        break;
                }
            }

            if (this.state.showPoints) {
                for (var i = 0; i < pose.keypoints.length; i++) {
                    const keypoint = pose.keypoints[i];
                    if (keypoint.score < minPartConfidence) {
                        continue;
                    }

                    this.drawPoint(canvasContext, keypoint['position']['x'], keypoint['position']['y']);
                }
            }

            if (showSkeleton) {
                const adjacentKeyPoints = posenet.getAdjacentKeyPoints(pose.keypoints, minPartConfidence);

                adjacentKeyPoints.forEach((keypoints) => {
                    this.drawSegment(canvasContext, [keypoints[0].position.x, keypoints[0].position.y],
                        [keypoints[1].position.x, keypoints[1].position.y]);
                });
            }
            if (this.state.running)
                requestAnimationFrame(findPoseDetectionFrame)
        }
        findPoseDetectionFrame()
    }

    finishWorkout() {
        this.setState({ running: false, showPoints: false })
        this.video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        // save to firebase 
    }

    render() {
        let cameraDivStyle;
        !this.state.loading && this.state.running ? (this.state.ready ? cameraDivStyle = { border: "0.5em solid green" } : cameraDivStyle = { border: "0.5em solid red" }) : cameraDivStyle = { border: "0.5em" }

        return (
            <div>
                {!this.state.loading && this.state.running ? (this.state.ready ? <Alert severity="success" style={{ marginBottom: "1em" }}>{"START YOUR EXERCISE"}</Alert> : <Alert style={{ marginBottom: "1em" }} severity="error">{"Please back up so that your entire body is in the frame"}</Alert>) : ""}

                <div style={{ float: "left" }}>
                    <video id="videoNoShow" playsInline ref={this.getVideo} style={{
                        display: "none"
                    }} />
                    <canvas className="webcam" ref={this.getCanvas} style={cameraDivStyle} />
                </div>
                {this.state.loading ?
                    <CircularProgress style={{ position: 'absolute', left: '50%', top: '50%' }} /> :
                    <div style={{ display: "flex", justifyContent: "center", height: "600px" }}>
                        <div style={{ alignSelf: "center", padding: "2rem" }}>
                            <InputLabel>Jumping Jack Reps: {this.state.jumpingJackReps}</InputLabel>
                            {this.state.running ? <Button type="button" onClick={this.finishWorkout}>End workout</Button> : ""}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Automatic;