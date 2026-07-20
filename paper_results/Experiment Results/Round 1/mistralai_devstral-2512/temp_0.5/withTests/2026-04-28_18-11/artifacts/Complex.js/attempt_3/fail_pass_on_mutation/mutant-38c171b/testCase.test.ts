import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle zero complex number", () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    expect(result.isInfinite()).toBe(true);
  });
});