import { useState } from 'react';
import { getCards } from './utils';

const UnMatchedCard = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 48 48"
    >
      <path
        fillRule="evenodd"
        d="m27.46 1.05 19.49 19.49.72.72.33.8v3.88l-.33.8-.72.72-19.49 19.49-.72.72-.8.33h-3.88l-.8-.33-.72-.72L1.05 27.46l-.72-.72-.33-.8v-3.88l.33-.8.72-.72L20.54 1.05l.72-.72.8-.33h3.88l.8.33zm-5.2 33.1v9.36l.25.25h2.98l.25-.25v-9.36l-.25-.25h-2.98zm0-20.3V4.5l.25-.25h2.98l.25.25v9.36l-.25.25h-2.98l-.25-.25ZM14 36.57h.4l2.73-2.73v-2.16l-.29-.3h-2.16l-2.73 2.73v.41zM11.94 14v-.4l2.05-2.06h.4l2.73 2.73v2.17l-.29.29h-2.16zm2.29 8.27H3.7l-.25.25v2.98l.25.25h10.53l.24-.25v-3l-.24-.25Zm15.35 7.94H26.6l-.24-.25V23c0-1.25-.49-2.2-1.99-2.24-.77-.02-1.65 0-2.59.04l-.14.15v9.01l-.25.25h-2.97l-.25-.25v-11.9l.25-.25h6.7c2.6 0 4.7 2.1 4.7 4.71v7.44zm4.2-4.46H44.3l.25-.25v-2.98l-.25-.25H33.77l-.24.25v2.98l.24.25Z"
      ></path>
    </svg>
  );
};

function App() {
  const [cards, setCards] = useState(getCards);
  const [flippedCards, setFlippedCards] = useState<typeof cards>([]);
  const [movesCount, setMovesCount] = useState(0);
  const [pairsMatched, setPairsMatched] = useState(0);

  const handleReset = () => {
    setCards(getCards);
    setFlippedCards([]);
    setMovesCount(0);
    setPairsMatched(0);
  };

  const handleMatching = (currentFlippedCards: typeof cards) => {
    // increment moves count
    setMovesCount((prevCount) => {
      return prevCount + 1;
    });

    const card1 = currentFlippedCards[0];
    const card2 = currentFlippedCards[1];

    // if image url is not matching then reset
    if (card1.image !== card2.image) {
      setFlippedCards([]);
      setCards((prev) => {
        return prev.map((p) => {
          if ([card1.id, card2.id].includes(p.id)) {
            return {
              ...p,
              flipped: false,
            };
          }

          return p;
        });
      });

      return;
    }

    // if image url is matching then set matched to true
    // and increment pairs matched
    setFlippedCards([]);
    setPairsMatched((prev) => prev + 1);
    setCards((prev) => {
      return prev.map((p) => {
        if ([card1.id, card2.id].includes(p.id)) {
          return {
            ...p,
            matched: true,
          };
        }

        return p;
      });
    });
  };

  const handleFlipCard = (card: (typeof cards)[0]) => {
    // if card is already flipped and matched then return
    if (card.flipped || card.matched) {
      return;
    }

    // if flipped cards has 2 entry then return
    if (flippedCards.length === 2) {
      return;
    }

    // flip the card
    setCards((prev) => {
      return prev.map((p) => {
        if (card.id === p.id) {
          return { ...p, flipped: true };
        }

        return p;
      });
    });

    // add the card to flipped cards
    setFlippedCards((prev) => {
      const currentFlippedCards = [...prev, card];

      // if 2 cards are flipped then check for matching
      if (currentFlippedCards.length === 2) {
        setTimeout(() => {
          handleMatching(currentFlippedCards);
        }, 1500);
      }

      return currentFlippedCards;
    });
  };

  return (
    <div className="mx-auto container my-8 flex flex-col gap-4 max-w-3xl">
      <h1 className="font-semibold text-2xl text-center">Match the pairs 🤔</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col bg-slate-300 hover:bg-slate-200 gap-4 rounded-md p-4 shadow-md">
          <h3 className="text-base">Pairs matched</h3>
          <h4 className="text-xl">
            {pairsMatched}/{cards.length / 2}
          </h4>
        </div>
        <div className="flex flex-col bg-slate-300 hover:bg-slate-200 gap-4 rounded-md p-4 shadow-md">
          <h3 className="text-base">Total moves</h3>
          <h4 className="text-xl">{movesCount}</h4>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex justify-center items-center min-w-10 h-28"
            onClick={() => handleFlipCard(card)}
          >
            {card.flipped || card.matched ? (
              <img width={50} height={50} src={card.image} />
            ) : (
              <UnMatchedCard />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-4 w-full">
        <button
          className="bg-slate-900 text-white rounded-md p-2 px-4 hover:bg-slate-800"
          onClick={handleReset}
        >
          {pairsMatched === cards.length / 2 ? 'Play again' : 'Reset'}
        </button>
      </div>
    </div>
  );
}

export default App;
