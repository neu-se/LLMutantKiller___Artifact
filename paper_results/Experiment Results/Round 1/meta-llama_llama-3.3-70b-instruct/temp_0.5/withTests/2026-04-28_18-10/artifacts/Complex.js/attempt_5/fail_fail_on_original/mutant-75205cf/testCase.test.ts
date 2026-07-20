import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result when subtracting two complex numbers', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex('Infinity');
    const result = complex1.sub(complex2);
    expect(result.toString()).toBe('NaN');
    expect(typeof result.sub).toBe('function');
  });
});