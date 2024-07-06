import './App.css'

import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useEffect, useRef, useState } from 'react';

function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  ///////////////////////////
  useEffect(()=>{
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if(search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if(search.match(/^\d+$/)){
      setError("No se puede buscar una pelicula con un nunmero")
      return
    }
    if(search.length < 3){
      setError("La busqueda debe al menos contener 3 caracteres")
      return
    }
    setError(null)
  }, [search])
  ///////////////////////////
  return { search, updateSearch, error }
}

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event)=>{
    /*event.preventDefault()
    const {query} = Object.fromEntries(
      new window.FormData(event.target)
    )
    console.log("hola");
    console.log(query.query)*/
    event.preventDefault()
    //console.log({query})
  }

  const handleChange = (event) =>{
    //const newQuery = event.target.value
    //if(newQuery.startswith('')) return
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h2>Movie searcher</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
          value={search} name="query" placeholder='movie'/>
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
