import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle zero real and non-zero imaginary parts correctly", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});