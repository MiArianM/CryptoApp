import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { AppContext } from "./Context";
import { Element } from "react-scroll";
import SequenceEN from "../SequanceTranslation/SequenceEN.json";
import SequenceFA from "../SequanceTranslation/SequenceFA.json";
import SequenceDE from "../SequanceTranslation/SequenceDE.json";
import VideoModal from "./VideoModal";
const HomeDescription = () => {
  const { state } = useContext(AppContext);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getSequence = () => {
    switch (state.language) {
      case "en":
        return SequenceEN;
      case "de":
        return SequenceDE;
      case "fa":
        return SequenceFA;
      default:
        return SequenceEN;
    }
  };

  return (
    <div className="HomeDescription">
      <h2 className="HomeDescription__Title">
        {t("Trade on the go | Anywhere, anytime.")}
      </h2>
      <p className="HomeDescription__Description">
        {t("Your crypto journey starts here !")}
      </p>
      <Element name="Home">
        <TypeAnimation
          key={state.language}
          className="TypingStories1"
          sequence={getSequence()}
          speed={45}
          repeat={Infinity}
        />
      </Element>
      <div className="LinkANDVideo">
        <a
          className="HomeDescription__Link"
          href="https://github.com/MiArianM"
          target="_blank"
        >
          {t("Find Out More")}
        </a>
        <div className="HomeDescription__Video" onClick={openModal}>
          <img
            className="HomeDescriptionVideo__Play"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjMyIiBoZWlnaHQ9IjIzMiIgdmlld0JveD0iMCAwIDIzMiAyMzIiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMzIiIGhlaWdodD0iMjMyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiPjxmZU9mZnNldCBkeT0iMTUiIGlucHV0PSJTb3VyY2VBbHBoYSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMwIiByZXN1bHQ9ImIiLz48ZmVGbG9vZCBmbG9vZC1jb2xvcj0iI2RmNjk1MSIgZmxvb2Qtb3BhY2l0eT0iMC4zMDIiLz48ZmVDb21wb3NpdGUgb3BlcmF0b3I9ImluIiBpbjI9ImIiLz48ZmVDb21wb3NpdGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZpbHRlcj48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3NiAtNjMxKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAxMCkiIHN0eWxlPSJpc29sYXRpb246aXNvbGF0ZSI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgMjcyLCA2MjEpIiBmaWx0ZXI9InVybCgjYSkiPjxjaXJjbGUgY3g9IjI2IiBjeT0iMjYiIHI9IjI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5MCA3NSkiIGZpbGw9IiNkZjY5NTEiLz48L2c+PHBhdGggZD0iTTcuNSwwLDE1LDE1SDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOTggNzE1KSByb3RhdGUoOTApIiBmaWxsPSIjZmZmIi8+PC9nPjwvZz48L3N2Zz4="
            alt="Play Button"
          />
          <span className="HomeDescription__Playtitle">{t("Play Demo")}</span>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        videoUrl="https://path-to-your-video.mp4"
        description={`${t(
          "Introducing Mim, where innovation meets opportunity in the world of cryptocurrency trading. With a commitment to transparency, security, and user-centric design, Mim offers a seamless platform for both seasoned traders and newcomers alike. Our cutting-edge technology ensures swift and reliable transactions, empowering users to navigate the dynamic crypto market with confidence. At Mim, we believe in democratizing access to digital assets, fostering a community built on trust and integrity. Join us on this exciting journey as we redefine the future of crypto trading."
        )}`}
      />
    </div>
  );
};

export default HomeDescription;
