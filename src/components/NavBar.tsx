import { container } from "../services/Container";
import { IEventManager } from "../services/EventManager";
import { getClearMessage } from "../services/EventMessages";

const NavBar = () => {
  const eventManager = container.get<IEventManager>("EventManager");
  const handleButtonClick = () => {
    const eventData = getClearMessage("NavBar");
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
