import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'test/utilities';
import TimeZone from '.';

beforeEach(() => {
  vi.useFakeTimers(); // freeze time
  vi.setSystemTime(new Date(12, 9, 12)); // set to a time
  //then call setSystemTime again  USE TO move forward animations
});

afterEach(() => {
  vi.useRealTimers();
});

test('it should render successfully', () => {
  render(<TimeZone />);
});

test('should match the snapshot', async () => {
  const { container } = render(<TimeZone getTodos />);
  expect(container).toMatchSnapshot();
});
