export interface Kiosk {
  id: string;
  slug: string;
  name: string;
  location?: string;
  color?: string;
  menuCategories?: string[]; // IDs das categorias disponíveis: '1', '2', '3', '4'
}

export const KIOSKS: Kiosk[] = [
  {
    id: 'churrasquinho_do_ze',
    slug: 'churrasquinho-do-ze',
    name: 'Churrasquinho do Zé',
    location: 'Rua A, nº 123',
    color: '#DA291C',
    menuCategories: ['1', '2', '3'], // Burgers, Batatas, Bebidas
  },
  {
    id: 'porcoes_do_mauricio',
    slug: 'porcoes-do-mauricio',
    name: 'Porções do Maurício',
    location: 'Rua B, nº 456',
    color: '#FFC72C',
    menuCategories: ['1', '2', '4'], // Burgers, Batatas, Sobremesas
  },
  {
    id: 'lanches_do_joão',
    slug: 'lanches-do-joao',
    name: 'Lanches do João',
    location: 'Rua C, nº 789',
    color: '#27251F',
    menuCategories: ['1', '3', '4'], // Burgers, Bebidas, Sobremesas
  },
];

export function getKioskBySlug(slug: string): Kiosk | undefined {
  return KIOSKS.find((k) => k.slug === slug);
}

export function getKioskById(id: string): Kiosk | undefined {
  return KIOSKS.find((k) => k.id === id);
}
