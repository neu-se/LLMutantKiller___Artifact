import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh of a real number less than -1", () => {
    // acosh(-2) should be log(2 + sqrt(3)) + i*pi
    // The else branch in acosh is taken when acos result has im > 0
    // which happens for real numbers < -1
    const result = new Complex(-2, 0).acosh();
    
    const expectedRe = Math.log(2 + Math.sqrt(3)); // ≈ 1.3169578969248166
    const expectedIm = Math.PI; // ≈ 3.141592653589793
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
    expect(isNaN(result.im)).toBe(false);
  });
});