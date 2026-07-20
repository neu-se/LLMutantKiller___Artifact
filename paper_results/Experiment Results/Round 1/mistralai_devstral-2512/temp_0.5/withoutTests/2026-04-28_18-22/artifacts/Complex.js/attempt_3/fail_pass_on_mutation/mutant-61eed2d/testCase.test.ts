import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing edge cases", () => {
  it("should correctly handle empty imaginary part in string parsing", () => {
    const c = new Complex("5i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(5);
  });
});