import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute the complex inverse hyperbolic cosine", () => {
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    const result = new Complex(2, 0).acosh();
    expect(result).toBeDefined();
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});