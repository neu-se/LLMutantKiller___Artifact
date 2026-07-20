import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should return a finite result for non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.isFinite()).toBe(true);
  });
});