import { render as _render, screen, waitFor } from 'test/utilities';
import { createStore } from './store';
import { Provider } from 'react-redux';
import { PackingList } from '.';
import { PropsWithChildren } from 'react';

const render: typeof _render = (Component, options) => {
  const store = createStore();

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return _render(Component, { ...options, wrapper: Wrapper });
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });
  expect(newItemInput).toHaveTextContent('');
  expect(newItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });
  await user.click(newItemInput);
  await user.keyboard('item');
  expect(newItemButton).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(newItemInput, 'iPad Pro');
  await user.click(newItemButton);

  expect(screen.getByLabelText('iPad Pro')).not.toBeChecked();

  await waitFor(() =>
    expect(screen.getByLabelText('iPad Pro')).not.toBeChecked(),
  );
});

it('remove an item', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });
  await user.type(newItemInput, 'iPad Pro');
  await user.click(newItemButton);

  const removeButton = screen.getByRole('button', { name: /remove/i });
});
