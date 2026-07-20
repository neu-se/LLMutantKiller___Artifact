import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return Infinity for zero input", () => {
    const c = new Complex(0, 0);
    const result = c.acoth();
    expect(result.isInfinite()).toBe(true);
  });
});