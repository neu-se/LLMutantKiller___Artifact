import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute acosh(-2) with correct imaginary part", () => {
    // For acosh(-2), acos(-2) should have im <= 0, triggering the if-branch
    // Original: tmp = res['re'], res['re'] = -res['im'], res['im'] = tmp (old re)
    // Mutated:  tmp = undefined, res['re'] = NaN, res['im'] = NaN
    const result = new Complex(-2, 0).acosh();
    
    // acosh(-2) = ln(2 + sqrt(3)) + i*π ≈ 1.3169578969248166 + iπ
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 5);
    expect(result.im).toBeCloseTo(Math.PI, 5);
  });
});