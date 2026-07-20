import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should handle non-zero real parts correctly", () => {
    const result = new Complex(0.5, 0).asec();
    expect(result.isFinite()).toBe(true);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1.0471975511965976, 10);
  });
});