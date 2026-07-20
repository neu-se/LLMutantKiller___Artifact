import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division edge case", () => {
  it("should handle division when real and imaginary parts are equal in magnitude", () => {
    const a = new Complex(3, 3);
    const b = new Complex(3, -3);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1);
  });
});