import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large real component", () => {
  it("should correctly compute the absolute value when real part is >= 3000 and imaginary part is < 3000", () => {
    // When re >= 3000 and im < 3000, original uses stable algorithm
    // Mutated code incorrectly uses direct sqrt which overflows for very large values
    const c = new Complex(1e200, 1);
    const result = c.abs();
    
    // The correct result should be approximately 1e200 (not Infinity)
    expect(result).toBeCloseTo(1e200, -190);
    expect(isFinite(result)).toBe(true);
  });
});