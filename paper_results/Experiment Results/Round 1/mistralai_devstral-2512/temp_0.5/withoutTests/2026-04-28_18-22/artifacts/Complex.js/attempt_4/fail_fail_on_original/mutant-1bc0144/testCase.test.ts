import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.8814, 4);
    expect(result.im).toBeCloseTo(-0.6585, 4);
  });
});