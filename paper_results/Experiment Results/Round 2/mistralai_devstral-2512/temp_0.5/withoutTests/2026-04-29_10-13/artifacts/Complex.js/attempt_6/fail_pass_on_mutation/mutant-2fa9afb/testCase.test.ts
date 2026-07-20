import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should not return NaN for non-zero inputs", () => {
    const result = new Complex(1, 1).sinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});