import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method mutation test', () => {
  it('should correctly compute csch(1+1i) with proper division operation', () => {
    const z = new Complex(1, 1);
    const result = z.csch();

    // The mutation changes division to multiplication in the csch method
    // For the original code, we expect a specific result structure
    // For the mutated code, the result will be completely different

    // Calculate expected values manually
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expected_real = 2 * Math.cosh(a) * Math.sin(b) / d;
    const expected_imag = 2 * Math.cosh(a) * Math.sin(b) / d;

    // Check that the result is close to expected (with tolerance)
    expect(Math.abs(result.re - expected_real)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expected_imag)).toBeLessThan(1e-10);

    // The mutated version would multiply instead of divide,
    // causing the values to be completely different
  });
});