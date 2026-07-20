import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return the correct acosh of a real number greater than 1", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    const expected = Math.acosh(2);
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-10);
    expect(Math.abs(result.im)).toBeLessThan(1e-10);
  });
});