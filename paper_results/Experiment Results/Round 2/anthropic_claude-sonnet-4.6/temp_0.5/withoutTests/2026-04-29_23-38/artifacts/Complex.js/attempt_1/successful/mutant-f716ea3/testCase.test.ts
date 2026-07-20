import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return Infinity for atanh(1) since atanh(1) = +Infinity", () => {
    const c = new Complex(1, 0);
    const result = c.atanh();
    
    // atanh(1) should be +Infinity (real part)
    // In the original code, when d === 0 and a !== -1, we get a/0 = Infinity
    // In the mutated code, (false) ? (a/0) : 0 always returns 0, giving wrong result
    expect(result.re).toBe(Infinity);
  });
});