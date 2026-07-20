import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("atanh(0+0i) imaginary part should be exactly 0, not NaN", () => {
    const c = new Complex(0, 0);
    const result = c.atanh();
    // In mutated code, b===0 branch gives b/0 = 0/0 = NaN for imaginary part
    // In original code, b!==0 is false so imaginary part is 0
    expect(Number.isNaN(result.im)).toBe(false);
    expect(result.re).toBe(0);
  });
});