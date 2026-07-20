import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle real numbers greater than 1 with zero imaginary part", () => {
    const result = new Complex(1.5, 0).atanh();
    expect(result.re).toBeCloseTo(0.9624236501192069);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});