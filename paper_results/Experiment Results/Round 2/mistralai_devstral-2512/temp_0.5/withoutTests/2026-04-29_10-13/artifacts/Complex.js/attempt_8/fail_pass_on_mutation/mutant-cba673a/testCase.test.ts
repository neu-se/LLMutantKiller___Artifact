import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should correctly compute cosh for non-zero real values when Math.cosh is not available", () => {
    const originalCosh = Math.cosh;
    Math.cosh = undefined;

    try {
      const c = new Complex(1, 0);
      const result = c.cosh();
      expect(result.re).toBeCloseTo(1.5430806348152437, 10);
      expect(result.im).toBeCloseTo(0, 10);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});