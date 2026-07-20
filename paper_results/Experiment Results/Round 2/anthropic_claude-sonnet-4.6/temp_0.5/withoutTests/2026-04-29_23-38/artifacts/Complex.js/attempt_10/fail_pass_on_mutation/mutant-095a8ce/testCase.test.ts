import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc existence", () => {
  it("acsc method should exist and return a valid Complex result for input 2", () => {
    const z = new Complex(2, 0);
    // In original: acsc is properly defined
    // In mutated: the JSDoc comment is not closed, so acsc may be undefined or broken
    expect(typeof (z as any)['acsc']).toBe('function');
    const result = (z as any)['acsc']();
    expect(result).toBeInstanceOf(Complex);
    expect(isNaN(result['re'])).toBe(false);
  });
});