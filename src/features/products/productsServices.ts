import api from "@/services/interceptor";
import { ProductType } from "@/types/productsType";

export const getAllProducts = async (): Promise<ProductType[]> => {
 return api.get('/products');
};

export const getProductDetail = async (id: string): Promise<ProductType> => {
  return api.get(`/products/${id}`);
};