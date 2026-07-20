import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should ceil real part to specified decimal places", () => {
    // With places=1 argument, original uses Math.pow(10, 1||0) = 10
    // Original: Math.ceil(1.23 * 10) / 10 = Math.ceil(12.3) / 10 = 13/10 = 1.3
    // Mutated:  Math.ceil(1.23 / 10) / 10 = Math.ceil(0.123) / 10 = 1/10 = 0.1
    const c = new Complex(1.23, 4.56);
    const result = c.ceil(1);
    expect(result.re).toBeCloseTo(1.3, 10);
    expect(result.im).toBeCloseTo(4.6, 10);
  });
});