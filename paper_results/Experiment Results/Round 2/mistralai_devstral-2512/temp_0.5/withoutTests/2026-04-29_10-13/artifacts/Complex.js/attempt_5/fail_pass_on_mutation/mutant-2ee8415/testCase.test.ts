import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh and maintain proper real part assignment", () => {
    const c = new Complex(1.5, 2);
    const result = c.acosh();
    // The mutation changes this['re'] to this[""] which would break the assignment
    // This test verifies the real part is correctly assigned by checking it's not undefined
    expect(result.re).not.toBeUndefined();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeUndefined();
    expect(result.im).not.toBeNaN();
    // Additional check to ensure the values are reasonable
    expect(Math.abs(result.re)).toBeGreaterThan(0);
  });
});