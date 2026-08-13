import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('renders the MCP market header', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
