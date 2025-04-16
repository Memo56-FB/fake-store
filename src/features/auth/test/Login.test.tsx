import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Login } from "../Login";
import { WrapperTest } from "@/test-utils/WrapperTest";

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const mockNavigate = vi.fn()

const renderLogin = () => render(
  <WrapperTest>
    <Login />
  </WrapperTest>
)

describe('<Login />', () => {
  beforeEach(renderLogin)

  it('should render login', () => {
    expect(screen.getByText('Acceder'))
  })

  it('should navigate to home page', async () => {
    const userNameInput = screen.getByLabelText('Usuario')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar sesión' })

    await act(() => {
      fireEvent.change(userNameInput, { target: { value: 'validUser' } })
      fireEvent.change(passwordInput, { target: { value: 'ValidPassword' } })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('should render a error message', async () => {
    const userNameInput = screen.getByLabelText('Usuario')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar sesión' })

    await act(() => {
      fireEvent.change(userNameInput, { target: { value: 'WrongUser' } })
      fireEvent.change(passwordInput, { target: { value: 'WrongPassword' } })
      fireEvent.click(submitButton)
    })
    const errorMessage = screen.getByText('username or password is incorrect')

    expect(errorMessage)
  })



});
