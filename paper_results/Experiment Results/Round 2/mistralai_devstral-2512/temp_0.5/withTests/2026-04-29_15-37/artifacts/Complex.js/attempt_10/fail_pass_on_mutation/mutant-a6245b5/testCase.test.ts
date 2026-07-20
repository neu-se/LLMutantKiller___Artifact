import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should handle edge case when real part is -1 and imaginary part is non-zero", () => {
    const result = new Complex(-1, 0.5).atanh();
    expect(result.im).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(Infinity);
  });
});