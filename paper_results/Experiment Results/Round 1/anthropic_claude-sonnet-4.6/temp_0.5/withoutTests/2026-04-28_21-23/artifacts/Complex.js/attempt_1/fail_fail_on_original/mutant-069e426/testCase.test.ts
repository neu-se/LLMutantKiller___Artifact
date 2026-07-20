import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation test', () => {
  it('should correctly compute asec when d is zero with non-zero a', () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (a === 0) ? a / 0 : 0
    // This affects the fallback branch in asec when d === 0
    // We need a case where a !== 0 but d = a*a + b*b === 0
    // This can happen with subnormal/denormal numbers
    // Use Number.MIN_VALUE which when squared gives 0
    const a = Number.MIN_VALUE;
    const b = 0;
    const result = new Complex(a, b).asec();
    // With original: a/0 = Infinity, so re = Infinity
    // With mutated: condition is (a === 0) which is false, so 0
    // Original gives Infinity, mutated gives 0
    expect(result.re).toBe(Infinity);
  });
});