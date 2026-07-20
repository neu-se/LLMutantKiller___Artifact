import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return the correct inverse of a non-zero complex number", () => {
    const z = new Complex(3, 4);
    const result = z.inverse();
    // 1/(3+4i) = (3-4i)/25 = 0.12 - 0.16i
    expect(result.re).toBeCloseTo(3 / 25, 10);
    expect(result.im).toBeCloseTo(-4 / 25, 10);
  });
});