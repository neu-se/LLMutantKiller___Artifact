import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh and maintain proper real part value", () => {
    const c = new Complex(1, 0);
    const result = c.acosh();
    // The mutation changes this['re'] to this[""] which would break the assignment
    // This test verifies the real part is correctly assigned by checking its exact value
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(Math.PI);
  });
});