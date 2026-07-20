import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication edge cases", () => {
  it("should correctly handle multiplication of Infinity by zero", () => {
    const infinity = Complex.INFINITY;
    const zero = new Complex(0, 0);
    const result = infinity.mul(zero);
    expect(result.toString()).toBe("NaN");
  });
});