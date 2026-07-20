import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should correctly compute inverse of a complex number with both real and imaginary parts", () => {
    const z = new Complex(3, 4);
    const result = z.inverse();
    // 1/(3+4i) = (3-4i)/25 = 0.12 - 0.16i
    expect(result.re).toBeCloseTo(0.12, 10);
    expect(result.im).toBeCloseTo(-0.16, 10);
  });
});