import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a sech method that is a function and returns a value', () => {
    const complex = new Complex(1, 1);
    expect(typeof complex.sech).toBe('function');
    const result = complex.sech();
    expect(result).toBeTruthy();
  });
});