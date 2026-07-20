import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle division by zero correctly when a=0 and b≠0", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    // The mutation changes (a !== 0) ? a/0 : 0 to (a === 0) ? a/0 : 0
    // When a=0, original returns 0, mutated returns 0/0 (NaN)
    expect(result.re).toBeCloseTo(0.8813735870195429);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});