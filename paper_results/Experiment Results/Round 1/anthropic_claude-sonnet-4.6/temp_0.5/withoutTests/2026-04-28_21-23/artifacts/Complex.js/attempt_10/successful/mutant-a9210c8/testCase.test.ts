import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch", () => {
  it("csch(1) should return a valid complex number", () => {
    // csch(z) = 1/sinh(z)
    // csch(1) = 1/sinh(1) ≈ 0.8509...
    // If csch is empty function returning undefined, this will fail
    const result = new Complex(1, 0).csch();
    
    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    // csch(1) = 1/sinh(1)
    const expected = 1 / Math.sinh(1);
    expect(result.re).toBeCloseTo(expected, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});