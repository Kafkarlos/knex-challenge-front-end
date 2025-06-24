import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("renderiza o título corretamente", () => {
  render(<Header />);

  const titulo = screen.getByText(/home/i);
  expect(titulo).toBeInTheDocument();
});
