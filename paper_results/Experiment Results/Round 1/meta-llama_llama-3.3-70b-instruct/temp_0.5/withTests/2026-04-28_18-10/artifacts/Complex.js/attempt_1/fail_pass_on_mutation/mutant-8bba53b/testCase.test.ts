import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly for small values of x', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    expect(result.re).toBeCloseTo(-0.000000000000005, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});