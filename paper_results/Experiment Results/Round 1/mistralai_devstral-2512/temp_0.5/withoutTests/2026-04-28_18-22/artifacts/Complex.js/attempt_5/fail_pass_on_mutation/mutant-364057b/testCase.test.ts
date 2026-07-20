import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle the case where a=0 and b≠0 correctly", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.8813735870195429);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});