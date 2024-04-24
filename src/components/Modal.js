import React from "react";
import removeImage from "../images/close.png";

const Modal = ({ imageUrl, onClose }) => {
	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content">
				<img src={imageUrl} alt="Modal" className="modal-image" />
			</div>
		</div>
	);
};

export default Modal;
