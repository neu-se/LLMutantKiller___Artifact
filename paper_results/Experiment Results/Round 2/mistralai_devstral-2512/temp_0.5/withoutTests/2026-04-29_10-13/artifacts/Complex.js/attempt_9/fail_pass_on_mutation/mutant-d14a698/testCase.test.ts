import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct sign for imaginary part when input has positive imaginary component", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.im).toBeGreaterThan(0);
  });
});