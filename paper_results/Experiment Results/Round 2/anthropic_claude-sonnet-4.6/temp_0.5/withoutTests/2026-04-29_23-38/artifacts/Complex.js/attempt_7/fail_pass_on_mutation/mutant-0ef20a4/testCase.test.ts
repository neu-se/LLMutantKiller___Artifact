import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should correctly compute inverse of a purely imaginary number", () => {
    // 1/(0 + 2i) = -i/2 = 0 - 0.5i
    const z = new Complex(0, 2);
    const result = z.inverse();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.5, 10);
    // Now test that zero inverse gives infinity, not NaN
    const zeroResult = new Complex(0, 0).inverse();
    const zeroResultIsNaN = isNaN(zeroResult.re) || isNaN(zeroResult.im);
    expect(zeroResultIsNaN).toBe(false);
    expect(zeroResult.re).toBe(Infinity);
  });
});