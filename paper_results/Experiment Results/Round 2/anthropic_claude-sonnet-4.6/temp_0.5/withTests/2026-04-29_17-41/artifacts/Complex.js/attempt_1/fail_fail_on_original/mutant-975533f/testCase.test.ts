import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth with correct imaginary sign for a complex number", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + i, the imaginary part of the result should have a specific sign
    // The mutation changes -b/d to +b/d in the atanh call inside acoth
    // which will flip the imaginary component of the result
    
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // Compute expected value manually:
    // acoth(2+i) = atanh(1/(2+i)) = atanh((2-i)/5) = atanh(0.4 - 0.2i)
    // The expected result for acoth(2+i):
    // Re(acoth(2+i)) ≈ 0.4023594781...
    // Im(acoth(2+i)) ≈ -0.2290726829...
    
    // With the mutation, -b/d becomes +b/d, so the imaginary part passed to atanh
    // would be +0.2 instead of -0.2, giving a different (wrong) result
    
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(-0.22907268296853878, 10);
  });
});