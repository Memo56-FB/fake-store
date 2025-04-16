import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { Register } from "../Register";
import { WrapperTest } from "@/test-utils/WrapperTest";

describe('Register', () => {
  beforeEach(() => {
    render(
      <WrapperTest>
        <Register />
      </WrapperTest>
    )
  })

  it('should render register', () => {
    expect(screen.getByText('Acceder')).toBeInTheDocument()
  })

  it('should register a new user successfully', async () => {
    const userNameInput = screen.getByLabelText('Usuario')
    const emailInput = screen.getByLabelText('Dirección de email')
    const passwordInput = screen.getByLabelText('Contraseña')

    const registerButton = screen.getByText('Registrarse')

    await act(() => {
      fireEvent.change(userNameInput, { target: { value: 'username' } })
      fireEvent.change(emailInput, { target: { value: 'email@memofb.dev' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      fireEvent.click(registerButton)
    })
    expect(screen.getByText('Usuario registrado con el ID: 11'))


  })
})