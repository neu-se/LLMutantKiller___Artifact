import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch by checking re value for acosh(-2)", () => {
    const z = new Complex(-2, 0);
    
    // First verify acos(-2) has im > 0 to confirm else branch is taken
    const acosResult = z.acos();
    expect(acosResult.im).toBeGreaterThan(0);
    
    const result = z.acosh();
    
    // Original: re = old_im of acos ≈ 1.3169578969248166
    // Mutated:  re = old_re of acos ≈ pi ≈ 3.14159...
    // These are clearly different, so this test distinguishes them
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
    expect(result.re).not.toBeCloseTo(Math.PI, 5);
  });
});