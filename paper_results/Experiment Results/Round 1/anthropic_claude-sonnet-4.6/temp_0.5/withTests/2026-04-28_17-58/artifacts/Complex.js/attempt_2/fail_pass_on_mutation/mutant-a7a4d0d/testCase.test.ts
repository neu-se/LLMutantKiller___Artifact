import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("acosh", () => {
  it("should return correct result for acosh of complex number with negative imaginary part", () => {
    // For z = 2 - 2i, acos(z) should have im > 0, triggering the else branch
    // Original: uses else branch; Mutated: uses if branch -> different result
    const result = new Complex(2, -2).acosh();
    const expected = new Complex(2, -2).acos(); // reference for structure
    
    // Verify using the identity: cosh(acosh(z)) = z
    const check = result.cosh();
    expect(check.re).toBeCloseTo(2, 10);
    expect(check.im).toBeCloseTo(-2, 10);
  });
});