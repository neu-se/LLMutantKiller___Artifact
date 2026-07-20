import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly compute acosh for a complex number and verify the result structure", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the result is a valid Complex number with finite values
    expect(result).toBeInstanceOf(Complex);
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    // Verify the result is not equal to a clearly wrong value
    expect(result.im).not.toBe(0);
  });
});