import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc() method', () => {
  it('should correctly compute the cosecant of a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    // The mutation changes the sign of the imaginary component in the csc calculation
    // Original: -Math.cos(a) * sinh(b) / d
    // Mutated:  +Math.cos(a) * sinh(b) / d
    // This will flip the sign of the imaginary part
    expect(result.im).toBeCloseTo(-0.425553243772347, 10);
  });
});