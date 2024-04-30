import { createContext, useState } from 'react';
import AuthService from '../services/AuthService'
import StoredSessionService from '../services/StoredSessionService';
import SessionService from '../services/SessionService';

const services = {
  authService: new AuthService(),
  storedSessionService: new StoredSessionService(),
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