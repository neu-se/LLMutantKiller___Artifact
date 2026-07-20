import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex tanh", () => {
  it("should return value between -1 and 1 for real input", () => {
    const c = new Complex(1, 0);
    const result = c.tanh();
    // tanh of any real number must be strictly between -1 and 1
    // mutated code produces ~3.047 which violates this
    expect(result.re).toBeGreaterThan(-1);
    expect(result.re).toBeLessThan(1);
    expect(result.im).toBeCloseTo(0, 10);
  });
});