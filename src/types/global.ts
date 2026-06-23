export type SortValue = 'latest' | 'low' | 'high';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  variant: string[];
};

export type ProductionAction = {
  status: number;
  body: string;
  data: Product[];
};
