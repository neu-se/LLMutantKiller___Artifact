import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should have an acot method that returns a value', () => {
    const complex = new Complex(1, 2);
    const acot = complex.acot;
    expect(typeof acot).toBe('function');
  });
});