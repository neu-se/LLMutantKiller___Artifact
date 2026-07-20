import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle division by zero case correctly", () => {
    const c = new Complex(0, 0);
    c.re = 0;
    c.im = 0;
    const result = c.acsch();
    expect(result.isInfinite()).toBe(true);
  });
});