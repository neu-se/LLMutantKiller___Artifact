import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh and verify the result structure", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943023812);
  });
});