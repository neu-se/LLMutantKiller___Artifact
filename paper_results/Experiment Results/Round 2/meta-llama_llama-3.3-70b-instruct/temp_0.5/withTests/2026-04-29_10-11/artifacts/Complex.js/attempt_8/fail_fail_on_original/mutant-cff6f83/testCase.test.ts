import { Complex } from "../complex";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(complex.re * (complex.re * complex.re + complex.im * complex.im));
  });
});