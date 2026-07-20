import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex prototype methods", () => {
  it("should detect mutation in if condition by testing acsc on zero input returns special value", () => {
    // Test that acsc method exists and handles zero specially
    const zero = new Complex(0, 0);
    // Access acsc via bracket notation to ensure we get the method
    const acscFn = (Complex.prototype as any)['acsc'];
    expect(typeof acscFn).toBe('function');
    const result = acscFn.call(zero);
    expect(result['re']).toBeCloseTo(Math.PI / 2, 5);
    expect(result['im']).toBe(Infinity);
  });
});