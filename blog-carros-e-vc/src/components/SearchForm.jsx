import { useState } from "react"
import { useNavigate } from "react-router-dom"

import styles from "./SearchForm.module.css"

const SearchForm = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    navigate(`/search?q=${trimmedQuery}`)
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ou busque por tags..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="btn btn-dark">Pesquisar</button>
    </form>
  )
}

export default SearchForm
