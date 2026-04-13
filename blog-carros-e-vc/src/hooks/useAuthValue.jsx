import { useContext } from "react"

import { AuthContext } from "../context/AuthContextValue"

export function useAuthValue() {
  return useContext(AuthContext)
}
