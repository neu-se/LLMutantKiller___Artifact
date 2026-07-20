import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the case where a=0 and b≠0 in the division-by-zero path", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    // The mutation changes the condition from (a !== 0) to (a === 0)
    // This test specifically targets the division-by-zero handling path
    expect(result.re).toBeCloseTo(0.8813735870195429);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});