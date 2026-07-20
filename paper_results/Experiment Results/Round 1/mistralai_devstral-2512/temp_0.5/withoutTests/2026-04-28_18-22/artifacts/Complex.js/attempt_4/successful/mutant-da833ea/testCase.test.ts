import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should produce consistent results for asech with specific input", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // Store the original result to compare with mutated version
    const originalRe = 1.0612750619050357;
    const originalIm = -0.9045568943023813;
    // The mutation changes -b/d to -b*d which will significantly alter the imaginary part
    expect(result.re).toBeCloseTo(originalRe, 10);
    expect(result.im).toBeCloseTo(originalIm, 10);
  });
});