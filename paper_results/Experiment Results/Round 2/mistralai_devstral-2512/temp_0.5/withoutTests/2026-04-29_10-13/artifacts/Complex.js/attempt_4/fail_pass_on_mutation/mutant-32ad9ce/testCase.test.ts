import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN values", () => {
  it("should treat complex number with only imaginary NaN as NaN", () => {
    const c = new Complex(1, NaN);
    expect(c.isNaN()).toBe(true);
  });
});