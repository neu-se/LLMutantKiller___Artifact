import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return correct result for zero complex number", () => {
    const c = new Complex(0, 0);
    const result = c.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});