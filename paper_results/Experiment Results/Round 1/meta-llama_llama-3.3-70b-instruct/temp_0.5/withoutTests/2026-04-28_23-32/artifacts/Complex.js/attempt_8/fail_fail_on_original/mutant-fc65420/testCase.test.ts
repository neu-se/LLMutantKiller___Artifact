import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct value for acsch when the real part is zero', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});