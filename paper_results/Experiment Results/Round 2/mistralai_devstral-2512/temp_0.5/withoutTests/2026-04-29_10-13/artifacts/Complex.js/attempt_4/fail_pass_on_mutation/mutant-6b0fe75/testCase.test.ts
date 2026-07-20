import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use fallback cosh implementation when Math.cosh exists", () => {
    // Force the use of fallback implementation by making Math.cosh return incorrect value
    const originalCosh = Math.cosh;
    Math.cosh = () => 999; // Incorrect value

    try {
      const c = new Complex(0.5, 0);
      const result = c.cosh();
      // Original code should use fallback and give correct result
      // Mutated code would use Math.cosh and give incorrect result
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});