import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct result for purely imaginary input with negative imaginary part", () => {
    const c = new Complex(0, -1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 4);
  });
});