import React from 'react'
import "./styles/PageHandler.css"

interface PageHandlerInterface{
    start: number|undefined;
    end: number|undefined;
    pageNumber: number;
    totalEntries: number|undefined;
    state: [number, React.Dispatch<React.SetStateAction<number>>]
}

const PageHandler = (props:PageHandlerInterface) => {
  const increasePageState = () =>{
    props.state[1](props.state[0] + 1);
    console.log(props.end, props.totalEntries)
  }
  const dereasePageState = () =>{
    console.log(props.end, props.totalEntries)
    props.state[1](props.state[0] - 1);
  }
  const isFirstPage = (props.state[0] === 0)
  const isLastPage = (props.end === props.totalEntries)
  return (
    <div className='apply-flex'>
        <p>Showing <strong>{props.start}</strong> - <strong>{props.end}</strong> out of <strong>{props.totalEntries}</strong> entries</p>
        <div className='apply-flex'>
            <button disabled={isFirstPage} onClick={dereasePageState}>Previous</button>
            <p><strong>{props.pageNumber}</strong></p>
            <button  disabled={isLastPage} onClick={increasePageState}>Next</button>
        </div>
    </div>
  )
}

export default PageHandler