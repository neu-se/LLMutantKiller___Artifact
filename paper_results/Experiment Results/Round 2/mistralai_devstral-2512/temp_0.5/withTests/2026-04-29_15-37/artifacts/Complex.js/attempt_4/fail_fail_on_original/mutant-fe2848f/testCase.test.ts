import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle real numbers greater than 1 with positive imaginary part", () => {
    const result = new Complex(2, 1).atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 5);
    expect(result.im).toBeCloseTo(0.7853981633974483, 5);
  });
});