import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should not return NaN for non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(result.isNaN()).toBe(false);
  });
});