import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle complex number with zero real part and non-zero imaginary part", () => {
    const c = new Complex(0, 2);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.5235987755982989, 10);
  });
});