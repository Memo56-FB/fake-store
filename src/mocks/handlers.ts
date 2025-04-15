import { http, HttpResponse } from 'msw'


export const handlers = [
  // ? Auth
  http.post('https://fakestoreapi.com/auth/login', async ({ request }: { request: Request }) => {
    const { username, password} = await request.json()
    if (username === 'WrongUser' && password === 'WrongPassword') {
      return HttpResponse.json('username or password is incorrect', { status: 401 })
    }
    return HttpResponse.json({ token: 'valid_token' }, { status: 200 })
  }),

  // ? Products
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json([
      {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
          "rate": 3.9,
          "count": 120
        }
      },
    ])
  }),
]