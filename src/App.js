import "./styles.css";
import Header from "./components/header";
import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";

export default function App() {
  return (
    <span className="App">
      <Header />
      <Toolbar />
      <Canvas />
    </span>
  );
}
