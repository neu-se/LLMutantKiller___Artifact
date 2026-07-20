import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a real number", () => {
    const c = new Complex(1, 0);
    const result = c.asinh();
    // asinh(1) = log(1 + sqrt(2)) ≈ 0.8813735870195430
    const expected = Math.asinh(1);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});