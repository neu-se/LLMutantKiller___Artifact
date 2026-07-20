import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should compute asec(2) correctly as a real number, not returning Complex(0, Infinity)", () => {
    // asec(2) = acos(1/2) = π/3 ≈ 1.0471975511965976
    const result = new Complex(2, 0).asec();
    
    // In the original code, asec(2) should return approximately π/3 + 0i
    // In the mutated code, since a !== 0 && b === 0 is true for (2, 0),
    // it incorrectly returns Complex(0, Infinity)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});