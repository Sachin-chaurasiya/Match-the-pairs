import { CARDS } from './constant';

export const getCards = () => {
  const anotherSetOfCards = CARDS.map((card) => ({
    ...card,
    id: `${card.id}-${Math.random()}`,
  }));
  return [...CARDS, ...anotherSetOfCards].sort(() => Math.random() - 0.5);
};
