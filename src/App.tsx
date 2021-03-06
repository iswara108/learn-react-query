import React from 'react'
import { useQuery } from 'react-query'
function App() {
  const [show, toggle] = React.useReducer(d => !d, true)

  return (
    <>
      <button onClick={() => toggle()}>{show ? 'Hide' : 'Show'}</button>
      {show && <Pokemons />}
    </>
  )
}

function Pokemons() {
  const queryInfo = useQuery<{ name: string; url: string }[]>(
    'pokemon',
    () =>
      new Promise(res => setTimeout(res, 2000))
        .then(() => fetch('https://pokeapi.co/api/v2/pokemon'))
        .then(res => res.json())
        .then(res => res.results),
    { cacheTime: 5000 }
  )

  console.log(queryInfo)

  return queryInfo.isLoading ? (
    <>Loading...</>
  ) : queryInfo.isError ? (
    <>Error</>
  ) : queryInfo.isIdle ? (
    <>Idle</>
  ) : (
    <>
      <div>
        {queryInfo.data.map(result => (
          <div key={result.name}>{result.name}</div>
        ))}
      </div>
      )<div>{queryInfo.isFetching ? 'Fetching' : null}</div>
    </>
  )
}
export default App
