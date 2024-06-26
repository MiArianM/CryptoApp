import Modal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const modalStyles1 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "4px solid black",
    borderRadius: "4rem",
    overflow: "hidden",
  },
  overlay: {
    backgroundImage:
      "linear-gradient(to left bottom, rgba(220, 210, 110, 0.8), rgba(211, 244, 150, 0.6), rgba(136, 215, 187, 0.8), rgba(178, 217, 245, 0.8), rgba(230, 210, 42, 0.5))",
  },
};
const modalStyles2 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "4px solid black",
    borderRadius: "4rem",
    overflow: "hidden",
  },
  overlay: {
    backgroundImage:
      "linear-gradient(to right bottom, rgba(110, 219, 110, 0.8), rgba(131, 214, 180, 0.5), rgba(36, 125, 87, 0.8), rgba(78, 187, 245, 0.8), rgba(180, 110, 113, 0.5))",
  },
};
const modalStyles3 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "4px solid black",
    borderRadius: "4rem",
    overflow: "hidden",
  },
  overlay: {
    backgroundImage:
      "linear-gradient(to right top, rgba(5, 25, 55, 0.5), rgba(31, 44, 180, 0.3), rgba(36, 65, 147, 0.8), rgba(183, 87, 235, 0.7), rgba(210, 140, 133, 0.4))",
  },
};
const modalStyles4 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "4px solid black",
    borderRadius: "4rem",
    overflow: "hidden",
  },
  overlay: {
    backgroundImage:
      "linear-gradient(to left, rgba(45, 225, 155, 0.6), rgba(25, 29, 179, 0.7), rgba(19, 33, 188, 0.8), rgba(125, 75, 82, 0.9), rgba(0, 10,0, 1)",
  },
};
const CloseButton = styled.button`
  position: absolute;
  top: -1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 4rem;
  color: red;
  cursor: pointer;
  z-index: 2;
`;
const RotatingList = ({ MoreDescription, VideoUrl }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const { t } = useTranslation();
  console.log("VideoUrl:", VideoUrl);
  const handleClick = (index) => {
    setSelectedItem(index);
    setIsExiting(false);
  };

  const handleUndo = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedItem(null);
      setIsExiting(false);
    }, 600);
  };

  return (
    <>
      <ol
        className={` ServiceThings ${selectedItem !== null ? "rotated" : ""}`}
      >
        {MoreDescription.map((item, index) => (
          <li
            className="ServiceThings__item"
            data-step={index + 1}
            key={index}
            onClick={() => handleClick(index)}
          >
            <div className="ServiceThings__content">
              <h4 className="ServiceThings__ProTitle">{t(item.ProsTitle)}</h4>
            </div>
          </li>
        ))}
      </ol>

      {selectedItem !== null && (
        <div
          className={`ServiceThings__description ${
            isExiting ? "exiting" : "coming"
          }`}
        >
          <video className="VideoContainer" autoPlay loop muted>
            <source className="CryptoVideo" src={VideoUrl} />
            {t("Your browser does not support the video tag.")}
          </video>
          <div className="DescriptionContent">
            {" "}
            <p className="DesciptionText">
              {t(MoreDescription[selectedItem].Description)}
            </p>
            <button className="UndoButton" onClick={handleUndo}>
              {t("Undo")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ServiceModal = ({ isOpen, onRequestClose, description }) => {
  const { MoreDescription, VideoUrl, HoverColored } = description;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={
        HoverColored === "Bitcoin"
          ? modalStyles1
          : HoverColored === "Tether"
          ? modalStyles2
          : HoverColored === "Cardano"
          ? modalStyles3
          : HoverColored === "Ether" && modalStyles4
      }
      ariaHideApp={false}
    >
      <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      <div style={{ padding: "20px", backgroundColor: "white" }}>
        {MoreDescription && MoreDescription.length > 0 ? (
          <div className="timeline-container">
            <div className="rocket"></div>
            <RotatingList
              MoreDescription={MoreDescription}
              VideoUrl={VideoUrl}
            />
          </div>
        ) : (
          <p>No additional information available.</p>
        )}
      </div>
    </Modal>
  );
};

ServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  description: PropTypes.shape({
    MoreDescription: PropTypes.arrayOf(
      PropTypes.shape({
        ProsTitle: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      })
    ).isRequired,
    HoverColored: PropTypes.string.isRequired,
    VideoUrl: PropTypes.string.isRequired,
  }).isRequired,
};

RotatingList.propTypes = {
  MoreDescription: PropTypes.arrayOf(
    PropTypes.shape({
      ProsTitle: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
  VideoUrl: PropTypes.string.isRequired,
};
export default ServiceModal;
