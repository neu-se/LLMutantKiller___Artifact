import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.5306, 3);
    expect(result.im).toBeCloseTo(-0.3275, 3);
  });
});