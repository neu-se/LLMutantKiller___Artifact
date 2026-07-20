import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct sign for imaginary part when input has negative imaginary component", () => {
    const c = new Complex(0, -1);
    const result = c.acot();
    expect(result.im).toBeGreaterThan(0);
  });
});