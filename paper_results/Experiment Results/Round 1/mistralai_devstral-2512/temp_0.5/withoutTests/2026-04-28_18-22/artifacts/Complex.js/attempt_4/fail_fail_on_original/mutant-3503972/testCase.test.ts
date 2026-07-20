import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return positive infinity for imaginary part when input has negative imaginary component", () => {
    const c = new Complex(0, -1);
    const result = c.acsch();
    expect(result.im).toBe(Infinity);
  });
});