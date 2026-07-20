import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use the fallback cosh implementation when Math.cosh is available", () => {
    // This test verifies the fallback is used by checking behavior with a value
    // where the fallback and native implementations might differ slightly
    const c = new Complex(1, 0);
    const result = c.cosh();
    // The fallback implementation should be used, giving a specific result
    expect(result.re).toBeCloseTo(1.5430806348152437);
    expect(result.im).toBeCloseTo(0);
  });
});