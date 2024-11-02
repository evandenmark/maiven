import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuTypes } from "../types";
import Users from "./Users";
import Messages from "./Messages";

const Menu = ({ currentUser, users, fetchUserCallback }) => {

  // either you view users or messages
  const [menuView, setMenuView] = useState<MenuTypes>(MenuTypes.USER)

  const handleToggle = () => {
    if (menuView === MenuTypes.USER) {
      setMenuView(MenuTypes.MESSAGES);
    } else {
      setMenuView(MenuTypes.USER)
    }
  }

  return (
    <>
      {/* toggle between USER and MESSAGES */}
      <ToggleButtonGroup
        color="primary"
        value={menuView}
        exclusive
        onChange={handleToggle}
        sx={{ padding: 5 }}
      >
        <ToggleButton value={MenuTypes.USER}>Users</ToggleButton>
        <ToggleButton value={MenuTypes.MESSAGES}>Messages</ToggleButton>
      </ToggleButtonGroup>

      {/* depending on the toggle, view either component */}
      {
        menuView === MenuTypes.USER
          ? <Users
            users={users}
            fetchUserCallback={fetchUserCallback}
          />
          : <Messages
            currentUser={currentUser}
            users={users}
            fetchUserCallback={fetchUserCallback}
          />
      }
    </>
  );
};

export default Menu;
