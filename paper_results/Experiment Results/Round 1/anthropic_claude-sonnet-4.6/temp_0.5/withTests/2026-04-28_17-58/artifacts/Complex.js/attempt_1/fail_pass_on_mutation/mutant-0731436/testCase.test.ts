import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec mutation test", () => {
  it("should return correct asec value for a complex number where d is zero edge case", () => {
    // The mutation changes (b !== 0) ? -b / 0 : 0 to (false) ? -b / 0 : 0
    // in the d === 0 branch of asec. We need to trigger this branch.
    // d = a*a + b*b = 0 only when a=0, b=0, but that's caught by early return.
    // However, we can test asec(0, 0) which returns Complex(0, Infinity)
    // and normal values to ensure the function works correctly.
    // Let's test asec(1, 0) = 0 (real case)
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
    
    // Test a value that goes through d !== 0 path
    const result2 = new Complex(2, 0).asec();
    expect(result2.re).toBeCloseTo(Math.acos(0.5), 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});