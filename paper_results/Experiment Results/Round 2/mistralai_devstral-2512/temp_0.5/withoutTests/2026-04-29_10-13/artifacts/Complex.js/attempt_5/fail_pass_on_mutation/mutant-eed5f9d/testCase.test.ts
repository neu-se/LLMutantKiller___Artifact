import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle edge case where both real and imaginary parts are zero", () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    expect(result.isInfinite()).toBe(true);
  });
});