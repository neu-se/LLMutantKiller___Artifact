import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should handle division by zero correctly for non-zero real part", () => {
    const result = new Complex(1, 0).asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1.5707963267948966);
  });
});