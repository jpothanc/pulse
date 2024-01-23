import { diContainer } from "../services/Container";
import { IEventManager } from "../services/EventManager";
import { getClearMessage } from "../services/EventMessages";

const NavBar = () => {
  const eventManager = diContainer.get<IEventManager>("EventManager");
  const handleButtonClick = () => {
    console.log("Home button clicked");

    const eventData = getClearMessage("NavBar");
    eventManager.publish(eventData);
  };
  return (
    <>
      <div className="navbar">
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Clear
        </button>
      </div>
    </>
  );
};

export default NavBar;
