import MobileDivider from "./images/pattern-divider-mobile.svg";
import DesktopDivider from "./images/pattern-divider-desktop.svg";
import Dice from "./images/icon-dice.svg";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [newId, setNewId] = useState("0");
  const [newAdvice, setNewAdvice] = useState(
    "Click the button to generate a new advice."
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let imgSource = MobileDivider;

  if (windowWidth > 600) {
    imgSource = DesktopDivider;
  } else {
    imgSource = MobileDivider;
  }

  //Change between dividers depending on window width
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const generateAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then(res => res.json())
      .then(data => {
        setNewId(data.slip.id);
        setNewAdvice(data.slip.advice);
      });
  };

  return (
    <div className="App">
      <p className="advice-id">{`ADVICE #${newId}`}</p>
      <p className="advice-adv">{`${newAdvice}`}</p>
      <img src={imgSource} alt="mob-divider" />
      <button onClick={() => generateAdvice()}>
        <img src={Dice} alt="button-icon" />
      </button>
    </div>
  );
};

export default App;
