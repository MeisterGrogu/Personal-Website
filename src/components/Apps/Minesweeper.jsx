import React, { useState, useEffect, useRef } from "react";

const createEmptyBoard = (rows, cols) =>
  Array(rows)
    .fill(null)
    .map(() =>
      Array(cols).fill({
        revealed: false,
        hasMine: false,
        adjacent: 0,
        flagged: false
      })
    );

const plantMines = (board, rows, cols, minesCount, excludeX, excludeY) => {
  let placed = 0;
  while (placed < minesCount) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);
    const inSafeZone =
      Math.abs(x - excludeX) <= 1 && Math.abs(y - excludeY) <= 1;

    if (!board[x][y].hasMine && !inSafeZone) {
      board[x][y] = { ...board[x][y], hasMine: true };
      placed++;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].hasMine) continue;

      let count = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const ni = i + dx;
          const nj = j + dy;
          if (
            ni >= 0 &&
            nj >= 0 &&
            ni < rows &&
            nj < cols &&
            board[ni][nj].hasMine
          ) {
            count++;
          }
        }
      }

      board[i][j] = { ...board[i][j], adjacent: count };
    }
  }

  return board;
};

const Minesweeper = () => {
  const [rows, setRows] = useState(16);
  const [cols, setCols] = useState(16);
  const [mines, setMines] = useState(40);
  const [board, setBoard] = useState(createEmptyBoard(rows, cols));
  const [firstClick, setFirstClick] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [timer, setTimer] = useState(0);
  const [flagsUsed, setFlagsUsed] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const checkVictory = (newBoard) => {
    let revealedCount = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (newBoard[i][j].revealed) revealedCount++;
      }
    }
    if (revealedCount === rows * cols - mines) {
      setVictory(true);
      stopTimer();
    }
  };

  const reveal = (x, y) => {
    let newBoard = [...board.map(row => row.map(cell => ({ ...cell })))];

    if (firstClick) {
      newBoard = plantMines(createEmptyBoard(rows, cols), rows, cols, mines, x, y);
      setFirstClick(false);
      startTimer();
    }

    if (newBoard[x][y].flagged || newBoard[x][y].revealed) return;

    const dfs = (i, j) => {
      if (
        i < 0 ||
        j < 0 ||
        i >= rows ||
        j >= cols ||
        newBoard[i][j].revealed ||
        newBoard[i][j].flagged
      )
        return;

      newBoard[i][j].revealed = true;

      if (newBoard[i][j].adjacent === 0 && !newBoard[i][j].hasMine) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            dfs(i + dx, j + dy);
          }
        }
      }
    };

    if (newBoard[x][y].hasMine) {
      newBoard[x][y].revealed = true;
      setBoard(newBoard);
      setGameOver(true);
      stopTimer();
      return;
    } else {
      dfs(x, y);
    }

    setBoard(newBoard);
    checkVictory(newBoard);
  };

  const toggleFlag = (e, x, y) => {
    e.preventDefault();
    if (gameOver || victory || board[x][y].revealed) return;

    const newBoard = [...board.map(row => row.map(cell => ({ ...cell })))];
    const cell = newBoard[x][y];

    cell.flagged = !cell.flagged;
    setFlagsUsed(prev => prev + (cell.flagged ? 1 : -1));
    setBoard(newBoard);
  };

  const restart = () => {
    stopTimer();
    setBoard(createEmptyBoard(rows, cols));
    setFirstClick(true);
    setGameOver(false);
    setVictory(false);
    setTimer(0);
    setFlagsUsed(0);
  };

  const handleCustomSettings = () => {
    const r = parseInt(prompt("Rows:", rows));
    const c = parseInt(prompt("Cols:", cols));
    const m = parseInt(prompt("Mines:", mines));
    if (
      r > 0 &&
      c > 0 &&
      m > 0 &&
      m < r * c
    ) {
      setRows(r);
      setCols(c);
      setMines(m);
      restart();
    }
  };

  return (
    <div className="flex flex-row p-4 bg-[#C0C0C0] min-h-screen text-black font-sans">
      <div className="flex flex-col">
        {board.map((row, i) => (
            <div key={i} className="flex">
            {row.map((cell, j) => (
                <button
                key={`${i}-${j}`}
                className={`w-[25px] h-[25px] text-xs font-bold select-none ${
                    cell.revealed
                    ? "bg-white"
                    : "bg-gray-400 hover:bg-gray-300 active:bg-gray-200"
                } ${cell.revealed ? "border border-gray-500" : "border border-black"}`}
                onClick={() => reveal(i, j)}
                onContextMenu={(e) => toggleFlag(e, i, j)}
                >
                {cell.revealed
                    ? cell.hasMine
                    ? "💣"
                    : cell.adjacent || ""
                    : cell.flagged
                    ? "🚩"
                    : ""}
                </button>
            ))}
            </div>
        ))}
        </div>


      <div className="ml-6 flex flex-col space-y-4 w-[200px]">
        {gameOver && <div className="text-red-600 font-bold text-xl">💥 Game Over</div>}
        {victory && <div className="text-green-600 font-bold text-xl">🎉 Victory!</div>}
        <button onClick={restart} className="bg-white px-4 py-2 border border-black">
          Restart
        </button>
        <button onClick={handleCustomSettings} className="bg-white px-4 py-2 border border-black">
          Change Settings
        </button>
        <div className="text-sm">
          <p><strong>Timer:</strong> {timer}s</p>
          <p><strong>Mines:</strong> {mines}</p>
          <p><strong>Flags:</strong> {flagsUsed}</p>
          <p><strong>Size:</strong> {rows} x {cols}</p>
          <p className="mt-2 italic text-gray-700">Right click to flag</p>
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
