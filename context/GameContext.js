import React, { createContext, useState, useContext } from "react";

// Create a context
export const GameContext = createContext();

// Create a provider component
export const GameProvider = ({ children }) => {
  // const [currentScreen, setCurrentScreen] = useState('start'); // start/game
  // const [name, setName] = useState("aaa");
  // const [email, setEmail] = useState("123456@qq.com");
  // const [phone, setPhone] = useState("1234567895");

  const [currentScreen, setCurrentScreen] = useState("start"); // start/game
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
