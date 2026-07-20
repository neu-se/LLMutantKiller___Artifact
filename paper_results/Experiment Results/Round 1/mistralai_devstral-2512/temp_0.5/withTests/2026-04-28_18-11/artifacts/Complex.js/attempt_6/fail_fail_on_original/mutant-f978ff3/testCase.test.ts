import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method mutation test', () => {
  it('should correctly compute csch(0.1+0.1i) and detect division vs multiplication', () => {
    const z = new Complex(0.1, 0.1);
    const result = z.csch();

    // Calculate the expected result manually using the correct formula
    const a = 0.1;
    const b = 0.1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expected_real = 2 * Math.cosh(a) * Math.sin(b) / d;
    const expected_imag = 2 * Math.cosh(a) * Math.sin(b) / d;

    // For the original code, both real and imaginary parts should be equal
    expect(result.re).toBeCloseTo(expected_real, 10);
    expect(result.im).toBeCloseTo(expected_imag, 10);

    // The mutated version would multiply by d instead of dividing
    // This would make the result completely different
    // We can verify this by checking the result is not equal to the mutated version
    const mutated_real = 2 * Math.cosh(a) * Math.sin(b) * d;
    const mutated_imag = 2 * Math.cosh(a) * Math.sin(b) * d;

    expect(result.re).not.toBeCloseTo(mutated_real, 5);
    expect(result.im).not.toBeCloseTo(mutated_imag, 5);
  });
});