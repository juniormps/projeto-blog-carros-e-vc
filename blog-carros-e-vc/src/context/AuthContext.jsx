import { AuthContext } from "./AuthContextValue"


export function AuthProvider({ children, value }) {

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )

}
