import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ reports, setReports ] = useState([])
  const pullData = () => {
    // const res = await axios.get('/reports/getAll')
    // console.log('res is ', res)

    fetch('/reports/getAll', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(json => {
      if ( json.elements ) {
        setReports(json.elements)
      }
    })

  }
  useEffect(() => {
    pullData()
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        {reports.map(rep => (
          <div style={{color: 'white'}}>
            {rep.id}
            {rep.state}
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
