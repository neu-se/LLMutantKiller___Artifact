import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return NaN for zero with negative real part", () => {
    const result = new Complex(0, 0).log();
    expect(result.isNaN()).toBe(true);
  });
});