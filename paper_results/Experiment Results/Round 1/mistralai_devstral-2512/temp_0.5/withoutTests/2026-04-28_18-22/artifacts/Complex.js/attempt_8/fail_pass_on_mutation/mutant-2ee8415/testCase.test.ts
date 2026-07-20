import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh and verify the result structure", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // This test checks that the result has the expected properties
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    // And verifies the actual computation
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943023812);
    // Additional check to ensure the result is not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});