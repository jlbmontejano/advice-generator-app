import Number from "./Components/Number";
import Advice from "./Components/Advice";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Number />
      <Advice />
      <img src="./images/pattern-divider-mobile.svg" alt="divider" />
    </div>
  );
};

export default App;
