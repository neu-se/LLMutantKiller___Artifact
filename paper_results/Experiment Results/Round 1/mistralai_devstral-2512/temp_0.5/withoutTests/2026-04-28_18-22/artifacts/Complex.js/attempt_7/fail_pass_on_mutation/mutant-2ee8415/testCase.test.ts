import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh and verify the result has proper numeric properties", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // Verify the result is a proper Complex object with numeric properties
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    // Verify the actual computation
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943023812);
  });
});