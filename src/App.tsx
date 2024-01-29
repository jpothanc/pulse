import Console from "./components/Console";
import NavBar from "./components/NavBar";
import SiderBar from "./components/SiderBar";

const App = () => {
  
  return (
    <>
      <div className="main">
        <NavBar />
        <SiderBar />
        <Console />
      </div>
    </>
  );
};

export default App;
