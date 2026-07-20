import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    const d = complex.re * complex.re + complex.im * complex.im;
    expect(result.re).toBeCloseTo(complex.re / d);
  });
});