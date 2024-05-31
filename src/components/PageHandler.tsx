import React from 'react'
import "./styles/PageHandler.css"

interface PageHandlerInterface{
    start: number|undefined;
    end: number|undefined;
    pageNumber: number;
    totalEntries: number|undefined;
}

const PageHandler = (props:PageHandlerInterface) => {
  return (
    <div className='apply-flex'>
        <p>Showing <strong>{props.start}</strong> - <strong>{props.end}</strong> out of <strong>{props.totalEntries}</strong> entries</p>
        <div className='apply-flex'>
            <button onClick={()=>alert("hi mom")}>Previous</button>
            <p><strong>{props.pageNumber}</strong></p>
            <button disabled={true} onClick={()=>alert("hi mom")}>Next</button>
        </div>
    </div>
  )
}

export default PageHandler