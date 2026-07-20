import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc() method', () => {
  it('should correctly compute the cosecant of a complex number and verify the sign of the imaginary component', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The mutation changes the sign of the imaginary component in the csc calculation
    // Original formula: -Math.cos(a) * sinh(b) / d
    // Mutated formula:  +Math.cos(a) * sinh(b) / d
    // We can detect this by checking the sign of the imaginary part
    expect(result.im).toBeLessThan(0);
  });
});