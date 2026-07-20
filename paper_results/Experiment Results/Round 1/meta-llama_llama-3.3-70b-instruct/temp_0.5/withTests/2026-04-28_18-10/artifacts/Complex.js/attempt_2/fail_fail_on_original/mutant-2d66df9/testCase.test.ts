import { Complex } from './complex.js';

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with different signs', () => {
    const complexNumber = new Complex('2-3i');
    expect(complexNumber.re).toBe(2);
    expect(complexNumber.im).toBe(-3);
  });
});