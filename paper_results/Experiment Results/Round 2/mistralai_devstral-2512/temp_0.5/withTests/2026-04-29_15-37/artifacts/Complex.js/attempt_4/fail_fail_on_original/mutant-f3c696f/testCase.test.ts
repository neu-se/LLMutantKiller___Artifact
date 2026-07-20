import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct imaginary part for complex number with zero real part and positive imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.acot();
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});