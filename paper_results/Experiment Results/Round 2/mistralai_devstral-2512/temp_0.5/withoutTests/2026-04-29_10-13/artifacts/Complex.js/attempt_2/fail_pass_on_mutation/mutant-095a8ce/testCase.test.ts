import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle non-zero complex numbers correctly", () => {
    const result = new Complex(1, 1).acsc();
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(false);
  });
});