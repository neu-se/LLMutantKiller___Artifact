import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN values", () => {
  it("should handle single NaN component correctly", () => {
    const c = new Complex(NaN, 0);
    expect(c.isNaN()).toBe(true);
  });
});