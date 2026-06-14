export const SIDEBAR_DATA = [
  {
    id: 'logo',
    title: 'McKiosk',
    image: 'logo.png',
  },
  {
    id: '1',
    title: 'Burgers',
    image: 'hamburguer.png',
  },
  {
    id: '2',
    title: 'Batatas',
    image: 'fries.png',
  },
  {
    id: '3',
    title: 'Bebidas',
    image: 'drinks.png',
  },
  {
    id: '4',
    title: 'Sobremesas',
    image: 'sundae.png',
  },
];

export const PRODUCTS: Record<
  string,
  Array<{ id: string; title: string; price: number; image?: string; ingredients?: string[] }>
> = {
  // Burgers
  '1': [
    {
      id: 'b1',
      title: 'Big Mc',
      price: 18.9,
      image: 'bigmc.png',
      ingredients: ['Alface', 'Queijo', 'Tomate', 'Molho Especial', 'Cebola'],
    },
    {
      id: 'b2',
      title: 'Duplo Cheeseburger',
      price: 16.5,
      image: 'duplo_cheese.png',
      ingredients: ['Queijo', 'Cebola', 'Molho Especial'],
    },
    {
      id: 'b3',
      title: 'Cheeseburger',
      price: 9.5,
      image: 'cheeseburger.png',
      ingredients: ['Queijo', 'Cebola', 'Molho'],
    },
  ],
  // Batatas
  '2': [
    {
      id: 'f1',
      title: 'Batata Média',
      price: 8.5,
      image: 'fries_medium.png',
      ingredients: ['Batata', 'Sal'],
    },
    {
      id: 'f2',
      title: 'Batata Grande',
      price: 11.0,
      image: 'fries_large.png',
      ingredients: ['Batata', 'Sal'],
    },
    {
      id: 'f3',
      title: 'Batata com Cheddar',
      price: 12.5,
      image: 'fries_cheddar.png',
      ingredients: ['Batata', 'Sal', 'Cheddar'],
    },
  ],
  // Bebidas
  '3': [
    {
      id: 'd1',
      title: 'Refrigerante Lata 350ml',
      price: 6.0,
      image: 'soda_can.png',
      ingredients: ['Gelo'],
    },
    { id: 'd2', title: 'Água 500ml', price: 4.0, image: 'water.png', ingredients: ['Gelo'] },
    {
      id: 'd3',
      title: 'Milkshake Baunilha',
      price: 9.0,
      image: 'milkshake_vanilla.png',
      ingredients: ['Gelo', 'Calda de Baunilha'],
    },
  ],
  // Sobremesas
  '4': [
    {
      id: 's1',
      title: 'Sundae Chocolate',
      price: 5.5,
      image: 'sundae_choco.png',
      ingredients: ['Sorvete', 'Calda de Chocolate', 'Granulado'],
    },
    {
      id: 's2',
      title: 'Apple Pie',
      price: 4.5,
      image: 'apple_pie.png',
      ingredients: ['Massa', 'Maçã', 'Canela'],
    },
  ],
};
