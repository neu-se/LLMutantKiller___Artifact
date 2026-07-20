import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("atanh(1 + 0i) should have infinite real part and zero imaginary part", () => {
    const result = new Complex(1, 0).atanh();
    expect(isFinite(result.re)).toBe(false);
    expect(isNaN(result.re)).toBe(false); // Should be Infinity, not NaN
    expect(result.im).toBe(0);
  });
});