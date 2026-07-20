import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should not return Infinity for non-zero input", () => {
    const result = new Complex(0, 1).acsc();
    expect(result.isInfinite()).toBe(false);
  });
});