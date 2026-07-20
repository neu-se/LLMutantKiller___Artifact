import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should handle non-zero imaginary component correctly", () => {
    const result = new Complex(0, 1).acoth();
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(false);
  });
});