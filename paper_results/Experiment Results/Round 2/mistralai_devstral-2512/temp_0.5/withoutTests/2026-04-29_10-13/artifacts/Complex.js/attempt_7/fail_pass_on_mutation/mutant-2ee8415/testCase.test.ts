import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh for a complex number and maintain proper real part assignment", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation changes this['re'] to this[""] which would break the assignment
    // This test verifies the real part is correctly assigned by checking it's a valid number
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943023814);
  });
});