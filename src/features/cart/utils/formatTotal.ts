import { ProductType } from "@/types/productsType";

export function formatTotal(cartProducts: ProductType[]): string {
  const total = cartProducts.reduce((acc, product) => acc + product.price, 0);
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);
}
