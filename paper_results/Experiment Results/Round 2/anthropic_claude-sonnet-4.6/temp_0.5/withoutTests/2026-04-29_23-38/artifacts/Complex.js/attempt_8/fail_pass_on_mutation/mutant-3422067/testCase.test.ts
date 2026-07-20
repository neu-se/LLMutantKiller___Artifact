import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of complex with large equal components", () => {
    // For x=y=3000: a=b=3000, goes to large-value path
    // Original (else): b = y/x = 1, result = 3000 * sqrt(2)
    // Mutated (if): a = b = 3000, b = x/y = 1, result = 3000 * sqrt(2)
    // Both give 4242.640687119286
    // Test that result equals 3000 * sqrt(1 + 1) computed the same way
    const x = 3000;
    const y = 3000;
    const c = new Complex(x, y);
    // Else branch computation: a=|x|=3000, b=y/x=1, result = 3000*sqrt(2)
    const elseResult = Math.abs(x) * Math.sqrt(1 + (y / x) * (y / x));
    // If branch computation: a=|y|=3000, b=x/y=1, result = 3000*sqrt(2)
    const ifResult = Math.abs(y) * Math.sqrt(1 + (x / y) * (x / y));
    // Both should be the same
    expect(elseResult).toBe(ifResult);
    // And abs() should match the else branch (original)
    expect(c.abs()).toBe(elseResult);
  });
});