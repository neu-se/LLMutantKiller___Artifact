import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot mutation test', () => {
  it('should correctly compute acot for a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    // The mutation changes the sign of the imaginary part in the acot calculation
    // For input (1, 1), the correct result should have a specific imaginary component
    // We'll verify the imaginary part is negative (as per original implementation)
    expect(result.im).toBeCloseTo(-0.3466, 4);
  });
});