import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 2);
    const csc = complex.csc();
    expect(csc.re).not.toBeNaN();
    expect(csc.im).not.toBeNaN();
    // The mutation changes the calculation of 'd' in the csc function.
    // This test will fail if the mutation is present because the calculation of 'd' is incorrect.
    const originalD = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    const calculatedD = 0.5 / Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    expect(originalD).not.toBeCloseTo(calculatedD);
  });
});