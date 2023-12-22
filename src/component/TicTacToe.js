import React from 'react'
import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import CrossJSON from '../lottie/cross.json'
import CircleJSON from '../lottie/circle.json'

const PLAYERS = {
  x: 'Player 2',
  o: 'Player 1'
}

export default function TicTacToe({ numCol, onExit }) {
  const [rows, setRows] = useState([])
  const [turn, setTurn] = useState(false)
  const [countTurn, setCountTurn] = useState(0);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [winner, setWinner] = useState(null)
  const [countWinner, setCountWinner] = useState({
    x: 0,
    o: 0
  });

  useEffect(() => {
    initRows()
  }, [])

  useEffect(() => {
    if(countTurn === Math.pow(numCol, 2) || winner !== null){
      setShowBackdrop(true);
      if(winner){
        setCountWinner({
          ...countWinner,
          [winner]: countWinner[winner] + 1
        })
      }
    }
  }, [countTurn, winner])


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

  function getCurrentPlayer(){
    return  turn ? 'x' : 'o'
  }

  function checkHorizontal(){
    const currPlayer = getCurrentPlayer()
    for(let i = 0; i < numCol; i++){
      const currArr = rows[i];
      let counter = 0;
      for(let j = 0; j < currArr.length; j++){
        const currPos = rows[i][j]
        if(currPos === currPlayer){
          counter++;
        }else{
          break;
        }
      }

      if(counter === numCol){
        setWinner(currPlayer)
        return true;
      }
    }
    return false
  }

  function checkVertical(){
    const currPlayer = getCurrentPlayer()
    for(let i = 0; i < numCol; i++){
      const currArr = rows[i];
      let counter = 0;
      for(let j = 0; j < currArr.length; j++){
        const currPos = rows[j][i]
        if(currPos === currPlayer){
          counter++;
        }else{
          break;
        }
      }

      if(counter === numCol){
        setWinner(currPlayer)
        return true;
      }
    }
    return false
  }

  function checkDiagonal(){
    const currPlayer = getCurrentPlayer()
    let counter = 0;
    for(let i = 0; i < numCol; i++){
      const currPos = rows[i][i];
      if(currPos === currPlayer){
        counter++;
      }else{
        break;
      }
    }

    if(counter === numCol){
      setWinner(currPlayer)
      return true;
    }

    for(let i = 0; i < numCol; i++){
      const currPos = rows[i][numCol - i - 1];
      if(currPos === currPlayer){
        counter++;
      }else{
        break;
      }
    }

    if(counter === numCol){
      setWinner(currPlayer)
      return true;
    }
    return false
  }

  function validateLocation(){
    const funcs = [checkHorizontal, checkVertical, checkDiagonal]
    for(let i = 0; i < funcs.length; i++){
      const func = funcs[i]
      const result = func();
      if(result){
        break;
      }
    }
  }

  function onItemClick(i, j){
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
    setRows(newRows)
    setTurn(!turn)
    validateLocation();
    setCountTurn(countTurn + 1);
  }

  function getAnimationData(type){
    if(type === 'x'){
      return CrossJSON
    }else if(type === 'o'){
      return CircleJSON;
    }
    return {}
  }

  function getBackdropSize(){
    let size = 0;
    switch(numCol){
      case 3:
        size = 150
        break;
      case 6:
        size = 120;
        break;
      case 9:
        size = 80;
        break;
      case 12:
        size = 60;
        break;
      default:
    }

    return {
      width: `${numCol * size}px`,
      height: `${numCol * size}px`,
    }

  }

  function renderBackdrop(){
    return (
      <div
        style={getBackdropSize()}
        className={`d-flex ${showBackdrop && 'visible'} flex-column justify-content-center align-items-center backdrop item-3`}>
        <h1 className="mb-3 fw-bold">{winner ? `${PLAYERS[winner]} win !` : 'Draw!'}</h1>
        <div className="d-flex flex-row">
          <Button onClick={onRetryClicked} variant="primary" className="me-2">Retry</Button>
          <Button onClick={onExit} variant="danger">End Game</Button>
        </div>
      </div>
    )
  }

  function onRetryClicked(){
    setCountTurn(0);
    setShowBackdrop(false);
    setTurn(false)
    initRows()
    setWinner(null)
  }

  return (
    <>
      <div className="d-flex flex-row align-items-center me-3">
          <strong className={`fs-2 ${!turn && 'text-success'}`}>O: {countWinner.o} </strong>
        </div>
        <div className="d-flex flex-column main-container">
          {renderBackdrop()}
          {rows.map((item, rowIndex) => (
              <div key={`${item.length}-${rowIndex}`} className="d-flex flex-row i-row w-100">
                {item.map((item2, colIndex) => (
                    <div key={`${item.length}-${item2}-${colIndex}`} onClick={() => onItemClick(rowIndex, colIndex)} className={`item item-${numCol} border border-secondary`}>
                      {item2 !== '' ? <Lottie style={{
                        width: '80%',
                        zIndex: -99
                      }} animationData={getAnimationData(item2)} loop={false} /> : null}
                    </div>
                ))}
              </div>
            ))}
        </div>
        <div className="d-flex flex-row align-items-center ms-3">
          <strong className={`fs-2 ${turn && 'text-success'}`} >X: {countWinner.x} </strong>
        </div>
    </>
  )
}

TicTacToe.propTypes = {
  numCol: PropTypes.number.isRequired,
  onExit: PropTypes.func.isRequired
}
