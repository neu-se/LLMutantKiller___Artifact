import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return NaN when adding Infinity to Infinity", () => {
    const result = Complex.INFINITY.add(Complex.INFINITY);
    expect(result.isNaN()).toBe(true);
  });
});