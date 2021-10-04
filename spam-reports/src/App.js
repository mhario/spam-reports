import { useEffect, useState } from 'react';
import {Report} from './Report'
import axios from 'axios'
import styled from 'styled-components'

import './App.css';

const AppStyle = styled.div`
  background-color: #282c34;
`

const Header = styled.header`
  color: #fafafa;
  text-align: center;
  padding-top: 40px;
`

const Body = styled.main`
  padding: 2rem 0;
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
      <Header>
        <h1>
        Spam Dash

        </h1>
      </Header>
      <Body>
        {reports.map(rep => (
          <Report report={rep} key={rep.id} /> )
        )}
      </Body>
    </AppStyle>
  );
}

export default App;
