import { http, HttpResponse } from 'msw'

const allProducts = [
  { id: 1, title: 'Producto 1', category: 'Electrónica', description: 'Descripción del producto 1', price: 100, rating: { rate: 4.5, count: 100} }
]

export const handlers = [
  // ?Login
  http.post('https://fakestoreapi.com/auth/login', async ({ request }: { request: Request }) => {
    const { email, password } = await request.json()
  
    if (email === 'usuario@test.com' && password === 'password123') {
      return HttpResponse.json({ id: 1 })
    }
    return new HttpResponse(JSON.stringify({ message: 'Credenciales inválidas' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }),


  // ? Products
  http.get('https://fakestoreapi.com/products', async () => {
    return HttpResponse.json(allProducts)
  })
]
