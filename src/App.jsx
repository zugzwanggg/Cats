import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
import CatCards from './components/CatCards'

function App() {
  const [catData,setCatData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [page,setPage] = useState(2)
  const [breed,setBreed] = useState('All')


  const breedArray = ['All','Bobtail','Chausie','Birman','American Wirehair','No breed']




  

  useEffect(()=>{

    setIsLoading(true)

    const fetchData = async () => {
      const breedParam = breed !== 'All' && `breed=${breed}`
      const res = await axios.get(`https://64e5dbde09e64530d17f26d9.mockapi.io/cats?p=${page}&l=4&${breedParam}`)
      setCatData(res.data)
      setIsLoading(false)
    }
    fetchData()
  },[page,breed])



  return (
    <div className='container'>
      <h1 style={{textAlign: 'center', fontSize: '3rem', margin: '3rem 0'}}>Cats</h1>
      <input onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search by name' type="text" />
      <hr />
      <div className="breed">
        {breedArray.map(obj => <button key={obj} onClick={()=>setBreed(obj)} className={breed == obj && 'active'}>
            {obj}
          </button>)}
      </div>
      <ul className="card-list">
        {
          isLoading
          ?
          <h3 style={{textAlign: 'center', fontSize: '3rem', margin: '3rem 0', height: '100vh'}}>Loading...</h3>
          :
          catData
          .filter(item => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase())
          })
          .map(obj => {
            return <li key={obj.id}>
              <CatCards
                key={obj.id}
                id={obj.id}
                img={obj.img}
                name={obj.name}
                breed={obj.breed}
              />
                  </li>
          })
        }
      </ul>
      <div className="pagination">
      {[...Array(5)].map((p, i)=> {
        return <button key={i} onClick={()=>setPage(i + 1)} className={page == i + 1 && 'active'}>{i + 1}</button>
      })}
      </div>
    </div>
  )
}

export default App
