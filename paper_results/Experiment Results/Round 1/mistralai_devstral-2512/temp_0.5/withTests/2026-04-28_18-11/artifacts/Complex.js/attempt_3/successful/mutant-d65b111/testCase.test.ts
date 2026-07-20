import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech method', () => {
  it('should correctly compute asech for a complex number with non-zero imaginary part', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes d = a*a + b*b to d = a*a + b/b
    // For b=0.5, b/b=1 while b*b=0.25, which significantly changes the calculation
    // We verify the result matches the expected output from the original implementation
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.9045568943023813);
  });
});