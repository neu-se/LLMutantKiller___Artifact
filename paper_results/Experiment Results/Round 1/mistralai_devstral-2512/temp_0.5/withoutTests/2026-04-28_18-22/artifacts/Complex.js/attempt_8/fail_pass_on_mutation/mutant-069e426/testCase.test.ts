import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return correct value when a=0 and b≠0", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(1.5707963267948966);
    expect(result.im).toBeCloseTo(0.8813735870195429);
  });
});