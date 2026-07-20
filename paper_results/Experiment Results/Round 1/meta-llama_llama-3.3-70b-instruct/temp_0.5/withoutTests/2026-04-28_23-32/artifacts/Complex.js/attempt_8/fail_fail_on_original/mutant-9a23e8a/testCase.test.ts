import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
    const complex2 = new Complex(2, 0);
    const result2 = complex2.acsch();
    expect(result2.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 5);
  });
});