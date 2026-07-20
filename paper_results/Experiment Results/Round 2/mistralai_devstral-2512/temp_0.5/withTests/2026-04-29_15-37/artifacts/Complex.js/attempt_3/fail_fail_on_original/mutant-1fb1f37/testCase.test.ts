import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for small values near zero", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original implementation should return approximately 1 - x for small x
    // The mutated implementation always returns (Math.exp(x) + Math.exp(-x)) * 0.5
    expect(result.re).toBeCloseTo(1 - 1e-10, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});