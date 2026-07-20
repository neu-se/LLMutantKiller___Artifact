import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh of 1+2i should have correct real part", () => {
    // Compute acos(1+2i) first to understand which branch runs
    const acosResult = new Complex(1, 2).acos();
    // If acosResult.im > 0, else branch runs in acosh
    // Original: result.re = acosResult.im
    // Mutated: result.re = acosResult.re (not updated)
    const result = new Complex(1, 2).acosh();
    
    if (acosResult.im > 0) {
      // else branch: re should be old im
      expect(result.re).toBeCloseTo(acosResult.im, 10);
    } else {
      // if branch: re should be -old im  
      expect(result.re).toBeCloseTo(-acosResult.im, 10);
    }
    // Known value: acosh(1+2i) ≈ 1.5285 + 1.1437i
    expect(result.re).toBeCloseTo(1.528570919480998, 8);
    expect(result.im).toBeCloseTo(1.1437177404024204, 8);
  });
});