import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [newId, setNewId] = useState("0");
  const [newAdvice, setNewAdvice] = useState(
    "Click the button to generate a new advice."
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      {windowWidth < 600 ? (
        <img
          src={process.env.PUBLIC_URL + "images/divider-mobile.svg"}
          alt="mobile-divider"
        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + "images/divider-desktop.svg"}
          alt="desktop-divider"
        />
      )}
      <button onClick={() => generateAdvice()}>
        <img
          src={process.env.PUBLIC_URL + "images/icon-dice.svg"}
          alt="button-icon"
        />
      </button>
    </div>
  );
};

export default App;
