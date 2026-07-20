import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN values", () => {
  it("should treat complex number with one NaN component as NaN", () => {
    const c = new Complex(5, NaN);
    expect(c.isNaN()).toBe(true);
  });
});