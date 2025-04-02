import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [disks, setDisks] = useState(3);
  const [towers, setTowers] = useState([[3, 2, 1], [], []]);
  const [moves, setMoves] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [draggedDisk, setDraggedDisk] = useState(null);
  const [balloons, setBalloons] = useState([]);
  const backgroundMusicRef = useRef(null);
  const winMusicRef = useRef(null);

  const diskColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];

  useEffect(() => {
    const initialTowers = [Array.from({ length: disks }, (_, i) => disks - i), [], []];
    setTowers(initialTowers);
    setMoves(0);
    setGameComplete(false);
    setBalloons([]);
  }, [disks]);

  useEffect(() => {
    if (towers[2].length === disks) {
      setGameComplete(true);
      if (!isMuted && !audioError) {
        try {
          backgroundMusicRef.current.pause();
          winMusicRef.current.play();
        } catch (error) {
          setAudioError(true);
        }
      }
      createBalloons();
    }
  }, [towers, disks, isMuted, audioError]);

  const createBalloons = () => {
    const newBalloons = [];
    for (let i = 0; i < 20; i++) {
      newBalloons.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 2,
        animationDelay: Math.random() * 2,
      });
    }
    setBalloons(newBalloons);
  };

  const handleDragStart = (e, diskValue, sourceTowerIndex) => {
    setDraggedDisk({ value: diskValue, sourceTowerIndex });
    e.dataTransfer.setData('text/plain', diskValue);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTowerIndex) => {
    e.preventDefault();
    if (draggedDisk && draggedDisk.sourceTowerIndex !== targetTowerIndex) {
      const sourceTower = towers[draggedDisk.sourceTowerIndex];
      const targetTower = towers[targetTowerIndex];
      const diskToMove = sourceTower[sourceTower.length - 1];

      if (targetTower.length === 0 || diskToMove < targetTower[targetTower.length - 1]) {
        const newTowers = towers.map((tower, index) => {
          if (index === draggedDisk.sourceTowerIndex) return tower.slice(0, -1);
          if (index === targetTowerIndex) return [...tower, diskToMove];
          return tower;
        });
        setTowers(newTowers);
        setMoves(moves + 1);
      }
    }
    setDraggedDisk(null);
  };

  const resetGame = () => {
    setTowers([Array.from({ length: disks }, (_, i) => disks - i), [], []]);
    setMoves(0);
    setGameComplete(false);
    setDraggedDisk(null);
    setBalloons([]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      try {
        backgroundMusicRef.current.pause();
      } catch (error) {
        setAudioError(true);
      }
    } else {
      try {
        backgroundMusicRef.current.play();
      } catch (error) {
        setAudioError(true);
      }
    }
  };

  const getDiskStyle = (disk, index, towerIndex) => {
    const baseHeight = 35;
    const spacing = 8;
    const bottomOffset = 20;
    const bottomPosition = bottomOffset + (index * (baseHeight + spacing));
    const baseWidth = 50;
    const widthIncrement = 35;

    return {
      width: `${baseWidth + (disk - 1) * widthIncrement}px`,
      backgroundColor: diskColors[disk - 1],
      bottom: `${bottomPosition}px`,
      boxShadow: `0 2px 4px rgba(0, 0, 0, 0.1)`,
      zIndex: towerIndex * 100 + index
    };
  };

  return (
    <div className="App">
      {!audioError && (
        <>
          <audio ref={backgroundMusicRef} src="/audio/background-music.mp3" loop />
          <audio ref={winMusicRef} src="/audio/win-music.mp3" />
        </>
      )}
      
      <div className="game-container">
        <h1>Tower of Hanoi</h1>
        
        <div className="controls">
          <div className="disk-control">
            <label>Number of Disks: {disks}</label>
            <input type="range" min="3" max="8" value={disks} onChange={(e) => setDisks(parseInt(e.target.value))} />
          </div>
          
          <div className="moves-counter">Moves: {moves}</div>
          
          {!audioError && (
            <button onClick={toggleMute} className="mute-button" title={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? '🔇' : '🔊'}
            </button>
          )}
        </div>

        <div className="towers-container">
          {towers.map((tower, towerIndex) => (
            <div key={towerIndex} className="tower" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, towerIndex)}>
              <div className="tower-base"></div>
              {tower.map((disk, diskIndex) => (
                <div
                  key={diskIndex}
                  className="disk"
                  draggable
                  onDragStart={(e) => handleDragStart(e, disk, towerIndex)}
                  style={getDiskStyle(disk, diskIndex, towerIndex)}
                >
                  {disk}
                </div>
              ))}
            </div>
          ))}
        </div>

        {gameComplete && (
          <div className="win-message">
            <h2>🎉 Congratulations! You won! 🎉</h2>
            <p>Total moves: {moves}</p>
            <button onClick={resetGame} className="play-again-button">Play Again</button>
          </div>
        )}

        <button onClick={resetGame} className="reset-button">Reset Game</button>
      </div>

      {balloons.map(balloon => (
        <div
          key={balloon.id}
          className="balloon"
          style={{
            left: `${balloon.left}%`,
            animationDuration: `${balloon.animationDuration}s`,
            animationDelay: `${balloon.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default App; 