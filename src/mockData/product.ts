export interface ProductData {
    id: number;
    name: string;
    price: number;
    category: string;
  }
  
  export const mockProductList: ProductData[] = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699, category: 'Electronics' },
    { id: 3, name: 'Chair', price: 120, category: 'Furniture' },
    { id: 4, name: 'Desk', price: 250, category: 'Furniture' },
    { id: 5, name: 'Headphones', price: 150, category: 'Electronics' },
    { id: 6, name: 'Blender', price: 80, category: 'Appliances' },
    { id: 7, name: 'Refrigerator', price: 1100, category: 'Appliances' },
    { id: 8, name: 'Television', price: 550, category: 'Electronics' },
    { id: 9, name: 'Microwave', price: 200, category: 'Appliances' },
    { id: 10, name: 'Sofa', price: 850, category: 'Furniture' },
  ];