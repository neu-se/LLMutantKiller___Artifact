import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should test the behavior of the mutated file in a way that reliably detects the mutation', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});