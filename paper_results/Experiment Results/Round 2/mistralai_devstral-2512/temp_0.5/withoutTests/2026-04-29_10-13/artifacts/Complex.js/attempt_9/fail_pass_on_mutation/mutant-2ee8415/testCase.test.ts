import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh and maintain proper property structure", () => {
    const c = new Complex(1.5, 0);
    const result = c.acosh();
    // The mutation changes this['re'] to this[""] which would break the assignment
    // This test verifies the result has the expected properties with correct types
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.re).toBeCloseTo(0.9624236501192069);
    expect(result.im).toBeCloseTo(0);
  });
});