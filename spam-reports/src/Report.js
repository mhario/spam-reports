import { useState } from 'react'

import styled from 'styled-components'
import axios from 'axios'

const ReportCard = styled.section`
  background-color: white;
  // border
  padding: 15px;
  margin: 2rem;

  // display: flex;
  // flex-direction: row;
  // div {
  //   display: flex; 
  //   flex-direction: column;
  // }

`

const Overview = styled.div`
  display: inline-block;
  width: 40%;
`
const Details = styled.div`
  display: inline-block;
  width: 40%;
`
const Options = styled.div`
  display: inline-block;
  width:  20%;
`

const Button = styled.button`
  border-radius: 3px;
  display: block;


`

export const Report = ({report}) => {
  console.log("Report -> report", report);
  const [ saving, setSaving ] = useState(false)
  const [ blocked, setBlocked ] = useState(false)

  const block = async () => {
    setSaving(true)
    const res = await axios.put(`/reports/block/${report.payload.referenceResourceId}`)
    if (res.success) {
      setBlocked(true)
      setSaving(false)
    }
  }
  
  const resolve = async () => {
    axios.put(`/reports/${report.id}`, 
      {ticketState: 'CLOSED'}
    )
  }

  return (
    <ReportCard>
      <Overview>
        <div>
          Id: {report.id}
        </div>
        <div>
          State: {report.state}

        </div>
      </Overview>
      <Details>
        Type: {report.payload.reportType}
      </Details>
      <Options>
        <Button
          onClick={block}
          disabled={blocked || saving}
        >{ saving ? '...' : 'Block' }</Button>
        <Button
          onClick={resolve}
          disabled={saving}
        >{ saving ? '...' : 'Resolve' }</Button>
      </Options>
    </ReportCard>
  )
}