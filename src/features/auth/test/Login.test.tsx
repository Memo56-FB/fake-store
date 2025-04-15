import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, Mock, beforeEach } from "vitest";
import { Login } from "../Login";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loginUser } from "../authServices";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient()

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

vi.mock('../authServices', () => ({
  loginUser: vi.fn()
}))

const mockNavigate = vi.fn()
const mockLoginUser = loginUser as Mock

const renderLogin = () => render(
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
        }}
      />
      <Login />
    </QueryClientProvider>
  </MemoryRouter>
)

describe('<Login />', () => {
  beforeEach(renderLogin)

  it('should render login', () => {
    expect(screen.getByText('Acceder'))
  })

  it('should render a error message', async () => {
    mockLoginUser.mockRejectedValue({ response: { data: 'username or password is incorrect' } });
    const userNameInput = screen.getByLabelText('Usuario')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar sesión' })

    await act(() => {
      fireEvent.change(userNameInput, { target: { value: 'WrongUserTest' } })
      fireEvent.change(passwordInput, { target: { value: 'WrongPasswordTest' } })
      fireEvent.click(submitButton)
    })
    const errorMessage = screen.getByText('username or password is incorrect')

    expect(errorMessage)
  })

  it('should navigate to home page', async () => {
    mockLoginUser.mockResolvedValue({ token: 'token' })
    const userNameInput = screen.getByLabelText('Usuario')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar sesión' })

    await act(() => {
      fireEvent.change(userNameInput, { target: { value: 'validUser' } })
      fireEvent.change(passwordInput, { target: { value: 'ValidPassword' } })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({ username: 'validUser', password: 'ValidPassword' })
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

});
