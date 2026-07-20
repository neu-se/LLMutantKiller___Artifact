import { Complex } from './complex';

describe('Complex', () => {
  it('should handle asec function correctly', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).not.toThrow();
  });
});