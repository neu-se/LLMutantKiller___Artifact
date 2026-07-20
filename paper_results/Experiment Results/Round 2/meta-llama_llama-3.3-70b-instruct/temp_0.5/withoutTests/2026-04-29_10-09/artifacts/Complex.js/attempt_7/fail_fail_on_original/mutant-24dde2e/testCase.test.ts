import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(1.0471975511965976, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});