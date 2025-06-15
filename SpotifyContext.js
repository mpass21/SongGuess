import React, { createContext, useState, useContext } from 'react';

const SpotifyContext = createContext();

export const useSpotify = () => {
  return useContext(SpotifyContext);
};

export const SpotifyProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null); 

  const value = { accessToken, setAccessToken, userInfo, setUserInfo };
  return (
    <SpotifyContext.Provider value={value}>
      {children}
    </SpotifyContext.Provider>
  );
};

export { SpotifyContext }; 
