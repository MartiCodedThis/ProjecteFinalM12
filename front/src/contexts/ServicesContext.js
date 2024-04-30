import { createContext, useState } from 'react';
import AuthService from '../services/IndexedDB/AuthService';
import LocalSessionService from '../services/LocalStorage/SessionService';
import SessionService from '../services/SessionStorage/SessionService';

const services = {
  authService: new AuthService(),
  localService: new LocalSessionService(),
  sessionService: new SessionService()
};
const ServicesContext = createContext();

export const ServicesContextProvider = ({ children }) => {
  return ( 
    <ServicesContext.Provider value={{ services }}>
        {children}
    </ServicesContext.Provider>
  )
};
export default ServicesContext