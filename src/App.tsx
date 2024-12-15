import { HtmlHTMLAttributes, useState } from 'react';
import { getCards } from './utils';

const UnMatchedCard = (props: HtmlHTMLAttributes<SVGElement>) => (
  <svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 50 50"
    xmlSpace="preserve"
    width={50}
    height={50}
    {...props}
  >
    <g>
      <path
        style={{
          fill: '#556080',
        }}
        d="M43.647 50H6.353A6.352 6.352 0 0 1 0 43.647V6.353A6.352 6.352 0 0 1 6.353 0h37.294A6.352 6.352 0 0 1 50 6.353v37.294A6.352 6.352 0 0 1 43.647 50"
      />
      <path
        style={{
          fill: '#F0C419',
        }}
        d="M24.074 3.704H6.353A2.652 2.652 0 0 0 3.704 6.353V24.074h20.37z"
      />
      <path
        style={{
          fill: '#ED7161',
        }}
        d="M3.704 25.926v17.721A2.652 2.652 0 0 0 6.353 46.296H24.074V25.926z"
      />
      <path
        style={{
          fill: '#67B9CC',
        }}
        d="M43.647 3.704H25.926v20.37h20.37V6.353A2.652 2.652 0 0 0 43.647 3.704"
      />
      <path
        style={{
          fill: '#A4E869',
        }}
        d="M25.926 46.296h17.721A2.652 2.652 0 0 0 46.296 43.647V25.926H25.926z"
      />
      <path
        style={{
          fill: '#F29C1F',
        }}
        cx={14.5}
        cy={15.5}
        r={7.5}
        d="M20.37 14.352A6.944 6.944 0 0 1 13.426 21.296A6.944 6.944 0 0 1 6.481 14.352A6.944 6.944 0 0 1 20.37 14.352z"
      />
      <path
        x={34.05}
        y={10.05}
        transform="rotate(-45.001 39 15)"
        style={{
          fill: '#48A0DC',
        }}
        width={9.899}
        height={9.899}
        d="M31.528 9.306H40.694V18.471H31.528V9.306z"
      />
      <path
        style={{
          fill: '#DF4D60',
        }}
        points="22,45 15,45 8,45 15,31  "
        d="M20.37 41.667L13.889 41.667L7.407 41.667L13.889 28.704Z"
      />
      <path
        style={{
          fill: '#4FBA6F',
        }}
        points="39,31 41.528,36.123 47,37 43.091,40.931 44.056,46.562 39,43.903 33.944,46.562  34.909,40.931 31,37 36.472,36.123  "
        d="M36.111 28.704L38.452 33.447L43.519 34.259L39.899 37.899L40.793 43.113L36.111 40.651L31.43 43.113L32.323 37.899L28.704 34.259L33.77 33.447Z"
      />
    </g>
  </svg>
);

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
