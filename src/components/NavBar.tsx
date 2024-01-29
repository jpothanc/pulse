import { CreateClearMessage } from "../services/EventMessages";
import { getInstance } from "../utils/factory";

const NavBar = () => {
  const eventManager = getInstance("EventManager");
  const handleButtonClick = () => {
    const eventData = CreateClearMessage(NavBar.name);
    eventManager.publish(eventData);
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">Pulse</div>
        <div className="navbar__menu">
          <div className="navbar__menu-item" onClick={handleButtonClick}>
            clear
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
