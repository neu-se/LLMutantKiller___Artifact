import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for zero real part', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(Infinity, 10);
  });
});