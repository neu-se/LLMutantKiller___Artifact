import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle case where both real and imaginary parts are non-zero", () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.1912257022711416);
    expect(result.im).toBeCloseTo(-0.3217505543965704);
  });
});