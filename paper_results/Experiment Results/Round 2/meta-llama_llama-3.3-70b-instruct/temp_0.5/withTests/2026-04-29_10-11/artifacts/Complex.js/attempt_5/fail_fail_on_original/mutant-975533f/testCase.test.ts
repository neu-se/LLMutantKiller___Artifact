import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expected = new Complex(0.5493061443340548, -0.5493061443340549);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});