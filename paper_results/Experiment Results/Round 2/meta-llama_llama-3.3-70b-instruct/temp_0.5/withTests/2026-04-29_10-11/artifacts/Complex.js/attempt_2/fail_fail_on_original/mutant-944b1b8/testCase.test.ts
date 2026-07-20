import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return correct value for asech', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});