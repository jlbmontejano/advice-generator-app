import Number from "./Components/Number";
import Advice from "./Components/Advice";
import MobileDivider from "./images/pattern-divider-mobile.svg";
import DesktopDivider from "./images/pattern-divider-desktop.svg";
import Dice from "./images/icon-dice.svg";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [newId, setNewId] = useState("0");
  const [newAdvice, setNewAdvice] = useState("Click the button to generate a new advice.");
  

  let imgSource = MobileDivider;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  if (windowWidth > 600) {
    imgSource = DesktopDivider;
  } else {
    imgSource = MobileDivider;
  }

  return (
    <div className="App">
      <Number id={newId} />
      <Advice advice={newAdvice} />

      <img src={imgSource} alt="mob-divider" />
      <button
        onClick={() => {
          fetch("https://api.adviceslip.com/advice")
            .then(res => res.json())
            .then(data => {
              setNewId(data.slip.id);
              setNewAdvice(data.slip.advice);
            });
        }}
      >
        <img src={Dice} alt="button-icon" />
      </button>
    </div>
  );
};

export default App;
