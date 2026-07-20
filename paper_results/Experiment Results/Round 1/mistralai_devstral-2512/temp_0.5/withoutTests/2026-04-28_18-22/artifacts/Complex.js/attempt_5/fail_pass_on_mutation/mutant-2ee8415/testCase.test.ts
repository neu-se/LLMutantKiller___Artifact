import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh and verify the result has valid properties", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});