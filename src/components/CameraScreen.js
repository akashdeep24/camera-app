import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addImage } from "../store/store";
import { useNavigate } from "react-router-dom";
import capture from "../images/capture.png";
import gallery from "../images/photo-gallery.png";
import reverseCamera from "../images/reverse.png";
import zoomout from "../images/magnifying-glass.png";
import Zoom from "../images/zoom-in.png";
import back from "../images/arrow.png";
const CameraScreen = () => {
	let screenHeight = window.screen.height
	let screenwidth= window.screen.width
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [width, setWidth] = useState(window.screen.width);
	const [height, setHeight] = useState(window.screen.height);
	const [cameraFacingMode, handleCameraFacingMode] = useState("environment");
	const [stream, setStream] = useState(null);
	const [zoomValue, setZoomValue] = useState(1);
	const [aspectRatioValue, setAspectRatioValue] = useState(undefined);

	let video, canvas;

	useEffect(() => {
		startCamera();
		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, [cameraFacingMode, zoomValue, aspectRatioValue]);

	const startCamera = async () => {
		try {
			const constraint = {
				video: {
					width: { ideal: 1280 },
					height: { ideal: 720 },
					facingMode: cameraFacingMode,
					zoom: zoomValue,
				},
				audio: false,
			};

			let streamm = await navigator.mediaDevices.getUserMedia(constraint);
			setStream(streamm);
			video = document.getElementsByTagName("video")[0];
			canvas = document.getElementsByTagName("canvas")[0];
			video.setAttribute("playsinline", "true");
			video.srcObject = streamm;
			video.onloadedmetadata = () => {
				const { clientLeft, clientTop, } =
					video;
				canvas.style.position = "absolute";
				canvas.style.left = clientLeft.toString();
				canvas.style.top = clientTop.toString();
				canvas.setAttribute("width", width.toString());
				canvas.setAttribute("height", height.toString());
				video.play();
			};
		} catch (e) {
			alert("Error accessing camera, please RELOAD and TRY AGAIN!!! ");
		}
	};

	const switchCameraFacingMode = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
		handleCameraFacingMode((prevMode) =>
			prevMode === "environment" ? "user" : "environment"
		);
	};

	const captureImage = async () => {
		try {
			video = document.getElementsByTagName("video")[0];
			canvas = document.getElementsByTagName("canvas")[0];
			let context = canvas.getContext("2d");
			context?.drawImage(video, 0, 0, width, height);
			let imageData1 = canvas.toDataURL("image/png", 1.0);
			let timeStamp = new Date().toString();
			dispatch(addImage({ image: imageData1, id: timeStamp }));
			alert("Image saved");
		} catch (e) {
			console.log(e);
			alert("Error in Capturing Image: " + e);
		}
	};
	const handleZoomChange = (value) => {
		if (cameraFacingMode == "user" || window.screen.width > 786) {
			alert("zoom works for phone's back camera only");
		} else {
			setZoomValue((prev) => prev + value);
		}
	};
	const changeAspectRatioValue = (e) => {
		let value = e.target.value;
		setAspectRatioValue(value);
		if(width>height){
			value == 'default'?setWidth(window.screen.width):setWidth(height / value);
		}else{
			value == 'default'?setHeight(window.screen.height):setHeight(width * value);
		}
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "start",
				alignItems: "flex-start",
				overflow: "hidden",
				height:screenHeight
			}}>
			<div>
				<video
					style={{ objectFit: "cover", width:width, height:height }}
				/>
				<canvas style={{ opacity: 0, width: width, height: height }} />
			</div>
			<div className="container">
				<div className="row justify-content-center align-items-end fixed-bottom pb-3">
					<div className="top-0 left-0 position-fixed">
						<img
							src={back}
							className="icon"
							onClick={() => navigate("/")}
						/>
					</div>
					<div className="col-auto d-flex flex-row">
						<div className="mx-1">
							<img
								src={zoomout}
								className="icon"
								onClick={() => handleZoomChange(-0.1)}
							/>
							<p
								style={{
									color: "blue",
									fontSize: 10,
									marginTop: 3,
								}}>
								Zoom out
							</p>
						</div>
						<div>
							<img
								src={Zoom}
								className="icon"
								onClick={() => handleZoomChange(0.1)}
							/>
							<p
								style={{
									color: "blue",
									fontSize: 10,
									marginTop: 3,
								}}>
								Zoom in
							</p>
						</div>
					</div>
					<div className="col-auto">
						<img
							src={reverseCamera}
							className="icon"
							onClick={switchCameraFacingMode}
						/>
						<p
							style={{
								color: "blue",
								fontSize: 10,
								marginTop: 3,
							}}>
							Switch
						</p>
					</div>
					<div className="col-auto">
						<img
							src={capture}
							className="iconBig"
							onClick={captureImage}
						/>
						<p
							style={{
								color: "blue",
								fontSize: 10,
								marginTop: 3,
							}}>
						</p>
					</div>
					<div className="col-auto">
						<img
							src={gallery}
							className="icon"
							onClick={() => navigate("/Gallery")}
						/>
						<p
							style={{
								color: "blue",
								fontSize: 10,
								marginTop: 3,
							}}>
							Gallery
						</p>
					</div>
					<div className="col-auto">
						<select
							className="btn btn-sm btn-secondary"
							value={aspectRatioValue}
							onChange={(e) => changeAspectRatioValue(e)}>
							<option >default</option>
							<option value={16 / 9}>16:9</option>
							<option value={4 / 3}>4:3</option>
							<option value={3 / 2}>3:2</option>
							<option value={1}>1:1</option>
						</select>
						<p
							style={{
								color: "blue",
								fontSize: 10,
								marginTop: 3,
							}}>
							Aspect ratio
						</p>
					</div>
				</div>
			</div>	
		</div>
	);
};

export default CameraScreen;
