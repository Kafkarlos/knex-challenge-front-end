import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("renderiza o título corretamente", () => {
  render(<Header />);

  // Verifica se o texto "Minha Rede Social" está visível na tela
  const titulo = screen.getByText(/home/i);
  expect(titulo).toBeInTheDocument();
});
