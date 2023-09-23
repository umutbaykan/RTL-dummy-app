import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { server, resolver } from './mockServiceWorker'; // Import the mock server

// Start the mock server before the tests
beforeAll(() => server.listen());

// Clean up and stop the mock server after the tests
afterAll(() => server.close());


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("it selects", () => {
  render(<App />);
  const pElement = screen.getByTestId("unique-id");
  expect(pElement).toBeInTheDocument();
})


test("it selects multiple elements", () => {
  render(<App />);
  const pElement = screen.getAllByTestId("unique-id");
  expect(pElement).toHaveLength(1);
})

test("it checks the content", () => {
  render(<App />);
  const pElement = screen.getByTestId("unique-id");
  expect(pElement).toHaveTextContent("initial state")
})

test("it checks the content after pressing the button", async () => {
  render(<App />);
  const buttonElement = screen.getByTestId('button-to-click');
  fireEvent.click(buttonElement)
  await waitFor(() => {
    const pElement = screen.getByTestId("unique-id");
    expect(pElement).toHaveTextContent("server response")  
  });
})

test("it checks the request itself", async () => {
  render(<App />);
  const buttonElement = screen.getByTestId('button-to-click-2');
  fireEvent.click(buttonElement)
  await waitFor(() => {
    expect(resolver).toHaveBeenCalledTimes(1)
    expect(resolver).toHaveBeenNthCalledWith("");
  });
  
})