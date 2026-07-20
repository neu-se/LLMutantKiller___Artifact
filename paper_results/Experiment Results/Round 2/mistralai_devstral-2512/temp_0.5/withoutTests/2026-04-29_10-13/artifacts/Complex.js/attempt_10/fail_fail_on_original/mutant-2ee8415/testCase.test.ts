import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh and verify property assignment", () => {
    const c = new Complex(0.5, 0);
    const result = c.acosh();
    // The mutation changes this['re'] to this[""] which would break the assignment
    // This test verifies the result has the expected properties and values
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI);
    // Additional check to ensure the properties are exactly 're' and 'im'
    expect('re' in result).toBe(true);
    expect('im' in result).toBe(true);
    expect('' in result).toBe(false);
  });
});