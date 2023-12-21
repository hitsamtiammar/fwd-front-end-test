import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Lottie from "lottie-react";
import CrossJSON from './lottie/cross.json'
import CircleJSON from './lottie/circle.json'
import './App.css';

function App() {
  const [numCol] = useState(9)
  const [rows, setRows] = useState([])
  const [turn, setTurn] = useState(false)

  useEffect(() => {
    initRows()
  }, [])

  function initRows(){
    const result = []
    for(let i = 0; i < numCol; i++){
      const arr = []
      for(let j = 0; j < numCol; j++){
        arr.push('')
      }
      result.push(arr)
    }
    setRows(result)
  }

  function onItemClick(i, j){
    console.log({ i, j})
    const newRows = [...rows];
    const item = newRows[i];
    if(item[j] !== ''){
      return
    }
    if(turn){
      item[j] = 'x'
    }else{
      item[j] = 'o'
    }
    console.log({ newRows })
    setRows(newRows)
    setTurn(!turn)
  }

  function getAnimationData(type){
    if(type === 'x'){
      return CrossJSON
    }else if(type === 'o'){
      return CircleJSON;
    }
    return {}
  }

  return (
    <div className="App">
      <Navbar expand="lg" bg="primary" className="position-sticky top-0" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand>Tic Tac Toe</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center flex-1">
        <div className="d-flex flex-column main-container">
          <div className="d-flex justify-content-center align-items-center backdrop item-3">
          </div>
          {rows.map((item, rowIndex) => (
              <div key={`${item.length}-${rowIndex}`} className="d-flex flex-row i-row w-100">
                {item.map((item2, colIndex) => (
                    <div key={`${item.length}-${item2}-${colIndex}`} onClick={() => onItemClick(rowIndex, colIndex)} className={`item item-${numCol} border border-secondary`}>
                      {item2 !== '' ? <Lottie style={{
                        width: '80%'
                      }} animationData={getAnimationData(item2)} loop={false} /> : null}
                    </div>
                ))}
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
