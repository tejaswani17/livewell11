
import React, { useState, useEffect } from 'react';

const CARD_SYMBOLS = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝', '🫐', '🍋'];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const BrainGameMemory: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const initGame = () => {
    const deck = [...CARD_SYMBOLS, ...CARD_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].symbol === cards[secondId].symbol) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setScore(s => s + 10);
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Memory Match</h2>
        <button onClick={initGame} className="text-blue-600 font-semibold px-4 py-2 border-2 border-blue-600 rounded-xl">Restart</button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="bg-blue-50 px-4 py-2 rounded-xl">
          <span className="text-slate-600 block text-sm">Score</span>
          <span className="text-xl font-bold text-blue-700">{score}</span>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-xl">
          <span className="text-slate-600 block text-sm">Moves</span>
          <span className="text-xl font-bold text-blue-700">{moves}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-20 sm:h-24 flex items-center justify-center text-3xl rounded-2xl cursor-pointer transition-all duration-300 transform ${
              card.isFlipped || card.isMatched 
                ? 'bg-blue-100 rotate-0' 
                : 'bg-slate-200 rotate-3 hover:rotate-0'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.symbol : '?'}
          </div>
        ))}
      </div>
      {cards.every(c => c.isMatched) && cards.length > 0 && (
        <div className="mt-8 text-center bg-green-100 p-4 rounded-2xl animate-bounce">
          <p className="text-green-800 font-bold text-xl">🎉 Well Done! Brain Workout Complete!</p>
        </div>
      )}
    </div>
  );
};

export default BrainGameMemory;
