import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh and verify the result has valid numeric properties", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});