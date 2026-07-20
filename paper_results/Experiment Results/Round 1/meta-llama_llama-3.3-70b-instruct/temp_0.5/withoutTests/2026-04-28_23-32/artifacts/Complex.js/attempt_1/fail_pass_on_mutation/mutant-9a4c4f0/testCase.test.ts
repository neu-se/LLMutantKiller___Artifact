import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const complex = new Complex(0.1);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.exp(0.1) * Math.cos(0) - 1, Math.exp(0.1) * Math.sin(0));
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});