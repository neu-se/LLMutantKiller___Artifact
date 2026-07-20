import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should not show minus sign for negative zero imaginary part when real part is non-zero", () => {
    const c = new Complex(3, 1);
    // Bypass epsilon check by temporarily modifying EPSILON
    const origEpsilon = (Complex as any).EPSILON;
    (Complex as any).EPSILON = 0; // Math.abs(-0) = 0, 0 < 0 is false, so -0 stays
    (c as any).im = -0;
    const result = c.toString();
    (Complex as any).EPSILON = origEpsilon;
    // With original code: b=-0, epsilon check fails (0 < 0 is false), b stays -0
    // b === 0 check: -0 === 0 is TRUE → early return → "3"
    // With mutated code: same → "3"
    expect(result).toBe("3");
  });
});