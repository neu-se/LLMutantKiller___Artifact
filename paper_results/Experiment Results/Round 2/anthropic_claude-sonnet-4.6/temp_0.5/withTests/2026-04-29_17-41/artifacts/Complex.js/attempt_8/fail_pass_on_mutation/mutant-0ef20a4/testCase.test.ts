import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse method should exist and return a Complex instance", () => {
    const c = new Complex(3, 4);
    expect(typeof c.inverse).toBe('function');
    const result = c.inverse();
    expect(result).toBeInstanceOf(Complex);
    // 1/(3+4i) = (3-4i)/25 = 0.12 - 0.16i
    expect(result.re).toBeCloseTo(3/25);
    expect(result.im).toBeCloseTo(-4/25);
  });
});