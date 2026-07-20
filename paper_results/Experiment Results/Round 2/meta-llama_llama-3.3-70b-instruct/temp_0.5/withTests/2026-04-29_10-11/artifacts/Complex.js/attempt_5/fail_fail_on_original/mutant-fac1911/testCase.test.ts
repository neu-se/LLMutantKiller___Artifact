import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the acsch function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.46364760900080615);
    expect(result.im).toBeCloseTo(-0.9272952180016122);
  });
});