import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech method', () => {
  it('should correctly compute asech for a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes d = a*a + b*b to d = a*a + b/b
    // For b=0.5, b/b=1, while b*b=0.25, which changes the calculation
    // We verify the result is finite and has expected properties
    expect(result.isFinite()).toBe(true);
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.5235987755982989);
  });
});