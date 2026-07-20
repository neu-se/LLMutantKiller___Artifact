import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct sign for imaginary part when input has negative imaginary component", () => {
    const c = new Complex(0, -1);
    const result = c.acoth();
    expect(Math.sign(result.im)).toBe(-1);
  });
});