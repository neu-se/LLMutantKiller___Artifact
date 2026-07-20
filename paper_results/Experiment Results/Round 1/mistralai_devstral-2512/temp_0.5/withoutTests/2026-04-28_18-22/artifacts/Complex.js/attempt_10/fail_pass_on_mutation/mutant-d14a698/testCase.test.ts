import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return correct imaginary component sign for negative imaginary input", () => {
    const c = new Complex(0, -1);
    const result = c.asec();
    expect(Math.sign(result.im)).toBe(-1);
  });
});