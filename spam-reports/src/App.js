import { useEffect, useState } from 'react';
import {Report} from './Report'
import axios from 'axios'
import styled from 'styled-components'

import './App.css';

const AppStyle = styled.div`
  background-color: #282c34;
`

const Header = styled.header`

`

const Body = styled.main`
  padding: 4rem 0;
`

function App() {
  const [ reports, setReports ] = useState([])
  const pullData = async () => {
    const res = await axios.get('/reports/getAll')

    if (res?.data?.elements?.length) {
      setReports(res?.data?.elements)
    }
    console.log('res is ', res)

    // fetch('/reports/getAll', {
    //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //   // mode: 'cors', // no-cors, *cors, same-origin
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(response => response.json())
    // .then(json => {
    //   if ( json.elements ) {
    //     setReports(json.elements)
    //   }
    // })

  }
  useEffect(() => {
    pullData()
  }, [])
  
  return (
    <AppStyle>
      <header>
      </header>
      <Body>
        {reports.map(rep => (
          console.log('rendering report', rep) || <Report report={rep} />
        ))}
      </Body>
    </AppStyle>
  );
}

export default App;
