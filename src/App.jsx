import './App.css'

import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useEffect, useState } from 'react';

function App() {
  const { movies } = useMovies();
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event)=>{
    /*event.preventDefault()
    const {query} = Object.fromEntries(
      new window.FormData(event.target)
    )
    console.log("hola");
    console.log(query.query)*/
    event.preventDefault()
    console.log({query})
  }

  const handleChange = (event) =>{
    setQuery(event.target.value)
  }

  useEffect(()=>{
    if(query === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if(query.match(/^\d+$/)){
      setError("No se puede buscar una pelicula con un nunmero")
      return
    }
    if(query.length < 3){
      setError("La busqueda debe al menos contener 3 caracteres")
      return
    }
  }, [query])
  
  return (
    <div className='page'>
      <header>
        <h2>Movie searcher</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name="query" placeholder='movie'/>
          <button type='submit'>Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
