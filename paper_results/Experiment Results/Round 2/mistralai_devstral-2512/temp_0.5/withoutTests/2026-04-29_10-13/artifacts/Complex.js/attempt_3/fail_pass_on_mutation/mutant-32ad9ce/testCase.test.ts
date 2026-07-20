import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN values", () => {
  it("should treat complex number with only real NaN as NaN", () => {
    const c = new Complex(NaN, 1);
    expect(c.isNaN()).toBe(true);
  });
});