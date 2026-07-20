import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication edge cases", () => {
  it("should return NaN when multiplying Infinity by zero", () => {
    const infinity = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = infinity.mul(zero);
    expect(result.isNaN()).toBe(true);
  });
});