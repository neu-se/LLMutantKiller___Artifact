import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return a valid complex number for non-zero input", () => {
    const result = new Complex(1, 1).sinh();
    expect(result.isNaN()).toBe(false);
    expect(result.isFinite()).toBe(true);
  });
});