import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle real numbers greater than 1 by verifying the sign change behavior", () => {
    const result1 = new Complex(2, 0).atanh();
    const result2 = new Complex(1.5, 0).atanh();
    expect(result1.re).toBeCloseTo(0.5493061443340548);
    expect(result1.im).toBeCloseTo(-Math.PI / 2);
    expect(result2.re).toBeCloseTo(0.9160148224060255);
    expect(result2.im).toBeCloseTo(-Math.PI / 2);
  });
});