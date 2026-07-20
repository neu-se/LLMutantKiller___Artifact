import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the case when a is 0 and b is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.8813735870195429, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});