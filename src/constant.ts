export const CARD_OBJ = [
  {
    id: '8e2400bc0ec52680a36d',
    image: 'https://app.netlify.com/8e2400bc0ec52680a36d.svg',
  },
  {
    id: '069691e7b23e769cc82f',
    image: 'https://app.netlify.com/069691e7b23e769cc82f.svg',
  },
  {
    id: '6a2eccd0274024ab9ff0',
    image: 'https://app.netlify.com/6a2eccd0274024ab9ff0.svg',
  },
  {
    id: 'c39a290e2e5cd2a0f42b',
    image: 'https://app.netlify.com/c39a290e2e5cd2a0f42b.svg',
  },
  {
    id: '07cb891f65e8435a1cd6',
    image: 'https://app.netlify.com/07cb891f65e8435a1cd6.svg',
  },
  {
    id: '5a7edd4317cfa0b67632',
    image: 'https://app.netlify.com/5a7edd4317cfa0b67632.svg',
  },
  {
    id: 'ba2d24b58b631925e1e5',
    image: 'https://app.netlify.com/ba2d24b58b631925e1e5.svg',
  },
  {
    id: '64fdc729bb68ba49f59f',
    image: 'https://app.netlify.com/64fdc729bb68ba49f59f.svg',
  },
];

export const CARDS = CARD_OBJ.map((card) => ({
  id: card.id,
  image: card.image,
  flipped: false,
  matched: false,
}));
