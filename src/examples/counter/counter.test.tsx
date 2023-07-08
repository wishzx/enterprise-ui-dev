// @vitest-environment happy-dom
import Counter from '.';
import { render, screen } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  await user.click(incrementButton);
  expect(currentCount).toHaveTextContent('1');
  screen.debug(document.body);
});

test('it should render the component with an initial count', () => {
  const { user } = render(<Counter initialCount={42} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('42');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={42} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('42');

  const button = screen.getByRole('button', { name: /reset/i });

  await user.click(button);
  expect(currentCount).toHaveTextContent('0');
});
