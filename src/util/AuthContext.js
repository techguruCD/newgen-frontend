import { createContext, useContext, useEffect, useMemo, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [token, _setToken] = useState();

  const checkToken = () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      _setToken(token);
      return true;
    }
    else {
      return false;
    }
  }
  // we could validate the token here
  const setToken = (token) => _setToken(token);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
    if (token) {
      console.log('setting token in local storage')
      localStorage.setItem('token', token);
    }
    else {
      
    }
  }, [token])

  const getToken = () =>  token !== undefined ? token : localStorage.getItem('token');
  const contextVal = useMemo(() => ({
    token: getToken(),
    setToken,
    checkToken
  }), [token]);

  return (
    <AuthContext.Provider value={contextVal}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;