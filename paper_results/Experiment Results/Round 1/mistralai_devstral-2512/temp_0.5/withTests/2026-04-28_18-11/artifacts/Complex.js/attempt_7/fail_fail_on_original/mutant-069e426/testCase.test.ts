import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should handle the case when a=0 and b≠0 by returning correct infinite values", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(-Infinity);
  });
});