import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should calculate acsch correctly", () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    const expected = Math.log(1 + Math.sqrt(1 * 1 + 1));
    expect(result.re).toBeCloseTo(expected);
    expect(result.im).toBeCloseTo(0);
  });
});