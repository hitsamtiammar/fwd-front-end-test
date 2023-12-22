import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TicTacToe from './component/TicTacToe';
import Landing from './component/Landing';
import './App.css';

function App() {
  const [numCol, setNumCol] = useState(3);
  const [page, setPage] = useState('landing');

  function onToGame(size) {
    setNumCol(size);
    setPage('tictactoe');
  }

  function renderPage() {
    if (page === 'landing') {
      return <Landing onToGame={onToGame} />;
    } else if (page === 'tictactoe') {
      return <TicTacToe onExit={() => setPage('landing')} numCol={numCol} />;
    }
    return null;
  }

  return (
    <div className="App">
      <Navbar
        expand="lg"
        bg="primary"
        className="position-sticky top-0"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand>Tic Tac Toe</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center flex-1">
        {renderPage()}
      </Container>
    </div>
  );
}

export default App;
