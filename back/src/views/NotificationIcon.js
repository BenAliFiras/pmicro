import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const NotificationIcon = ({ showNotification }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Fermez la notification après 5 secondes
    if (showNotification) {
      const timeout = setTimeout(() => {
        setDropdownOpen(false);
        console.log("Notification fermée après 60 secondes");
      }, 60000); // Changez ici de 60000 à 10000 (10 secondes) pour tester plus rapidement

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showNotification]);

  return (
    <Dropdown isOpen={showNotification && dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret nav>
        <i className="nc-icon nc-bell-55" />
        <p>
          <span className="d-lg-none d-md-block">Notifications</span>
        </p>
      </DropdownToggle>
      {showNotification && (
        <DropdownMenu right>
          <DropdownItem>Nouvelle réclamation ajoutée !</DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default NotificationIcon;
