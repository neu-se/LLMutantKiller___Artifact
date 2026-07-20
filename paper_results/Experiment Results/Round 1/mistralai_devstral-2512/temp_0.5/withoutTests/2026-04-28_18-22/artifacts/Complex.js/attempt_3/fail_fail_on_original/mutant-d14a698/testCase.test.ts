import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return correct result for asec of a purely imaginary number with negative imaginary part", () => {
    const c = new Complex(0, -1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});