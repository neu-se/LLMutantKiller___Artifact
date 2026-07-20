import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate asinh correctly", () => {
    const complex = new Complex(1, 0);
    const result = complex.asinh();
    expect(result.re).toBeCloseTo(result.im, 5);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.asinh();
    expect(result2.re).toBeCloseTo(-result2.im, 5);
  });
});