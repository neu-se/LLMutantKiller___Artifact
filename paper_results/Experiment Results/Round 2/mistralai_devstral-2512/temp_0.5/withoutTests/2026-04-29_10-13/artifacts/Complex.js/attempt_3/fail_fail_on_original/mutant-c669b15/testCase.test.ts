import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division edge case", () => {
  it("should handle division when real and imaginary parts have equal absolute values", () => {
    const a = new Complex(2, 3);
    const b = new Complex(3, -2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(0.56, 2);
    expect(result.im).toBeCloseTo(0.48, 2);
  });
});