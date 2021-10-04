import { useState } from 'react'

import styled from 'styled-components'
import axios from 'axios'

const ReportCard = styled.section`
  background-color: white;
  padding: 15px;
  margin: 2rem;

  display: flex;
  flex-direction: row;
  /* div {
    display: flex; 
    flex-direction: column;
  } */
`

const Id = styled.span`
  font-style: italic;
  color: #999;
`

const Overview = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 40px 5px 0;
  
`
const Details = styled.div`
  margin: 5px 40px 5px 0;
`
const Options = styled.div`
  width: 150px;
`

const Button = styled.button`
  border-radius: 3px;
  display: block;

  width: 100%;
  padding: 3px 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
  &:first-of-type{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:nth-child(2){
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`

const Link = styled.a`
  text-decoration: none;
  font-size: 12px;
  margin: 20px;
  display: inline-block;
`

const MessageBox = styled.div`
  margin: 20px 0;
  ${({ noMsg }) => noMsg ? 'color: #666; font-style: italic;' : 'color: #333;'}
  background-color: #dadada;
  border: 1px solid #cacaca;
  padding: 5px;
  border-radius: 5px;
  
`

export const Report = ({report}) => {

  const [ saving, setSaving ] = useState(false)
  const [ blocked, setBlocked ] = useState(report.blocked)
  const [ resolved, setResolved ] = useState(report.state === 'CLOSED')

  const block = async () => {
    setSaving(true)
    const res = await axios.put(`/reports/block/${report.id}`)

    const { data } = res
    if ( data.success ) {
      setBlocked(true)
      setSaving(false)
    }
  }
  
  const resolve = async () => {
    setSaving(true)
    const res = await axios.put(`/reports/${report.id}`, 
      {ticketState: 'CLOSED'}
    )

    const { data } = res
    if ( data.success ) {
      setResolved(true)
      setSaving(false)
    }
    
  }

  return (
    <ReportCard>
      <div style={{flexGrow:1}}>
        Id: <Id>{report.id}</Id>
        <Overview>
          <span>
            State: {resolved && 'CLOSED' || report.state}
          </span>
          <span>
            Blocked?: { (report.blocked || blocked) ? 'YES' : 'NO' }
          </span>
        </Overview>
        <Details>
          Type: {report.payload.reportType}
        </Details>
        <MessageBox noMsg={! report.payload.message}>
          { report.payload.message || 'No message..' }
        </MessageBox>
      </div>
      <Options>
        <Button
          onClick={block}
          disabled={blocked || saving}
        >{ saving ? '...' : 'Block' }</Button>
        <Button
          onClick={resolve}
          disabled={resolved || saving}
        >{ saving ? '...' : 'Resolve' }</Button>
        <Link href="">Details...</Link>
      </Options>
    </ReportCard>
  )
}