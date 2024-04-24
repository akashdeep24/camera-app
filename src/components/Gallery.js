import React, { useState } from "react";
import arrow from "../images/arrow.png";
import cameraImage from "../images/camera.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import removeImage from "../images/trash.png";
import { deleteImage } from "../store/store";
import Modal from "./Modal";

function Gallery() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const images = useSelector((state) => state.images);
	const [zoomedImage, setZoomedImage] = useState("");
	const [opneModal, setOpenModal] = useState(false);

	const zoomImage = (image) => {
		setZoomedImage(image);
		setOpenModal(true);
	};
	const closeModal = () => {
		setOpenModal(false);
		setZoomedImage("");
	};
	return (
		<div className="container pt-3">
			<div className="d-flex flex-row justify-content-between">
				<img
					src={arrow}
					className="icon"
					onClick={() => navigate("/")}
				/>
				<h1>Gallery</h1>
				<img
					src={cameraImage}
					className="icon"
					onClick={() => navigate("/Camera")}
				/>
			</div>
			<div className="row d-flex justify-content-center ">
				{images.map((item) => (
					<div
						key={item.id}
						className="col-lg-4 col-md-6 col-12 mt-md-4 mt-2 pt-2 d-flex justify-content-center image_container ">
						<img
							src={item.image}
							className="gallery_image"
							onClick={() => zoomImage(item.image)}
						/>
						<img
							src={removeImage}
							className="icon"
							onClick={() => dispatch(deleteImage(item.id))}
							style={{
								alignSelf: "flex-start",
								zIndex: 1,
							}}
						/>
					</div>
				))}
				{images.length == 0 && <h2>No Image Found!</h2>}
			</div>
			{opneModal && <Modal imageUrl={zoomedImage} onClose={closeModal} />}
		</div>
	);
}

export default Gallery;
