import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should return NaN for NaN input", () => {
    const c = new Complex(NaN, 0);
    const result = c.exp();
    expect(result.isNaN()).toBe(true);
  });
});