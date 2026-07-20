import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const expected = new Complex(Math.log((1 + Math.sqrt(1 + complex.abs() * complex.abs())) / complex.abs()));
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});