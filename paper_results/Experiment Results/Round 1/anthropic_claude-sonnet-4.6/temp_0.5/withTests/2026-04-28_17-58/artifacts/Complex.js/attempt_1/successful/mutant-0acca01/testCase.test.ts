import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a real number greater than 1", () => {
    // acoth(2) = atanh(1/2) ≈ 0.5493061443340548
    const result = new Complex(2, 0).acoth();
    
    // With original code: a/d = 2/4 = 0.5, so acoth(2) = atanh(0.5) ≈ 0.5493
    // With mutated code: a*d = 2*4 = 8, so acoth(2) = atanh(8) which is different
    const expected = Math.log(3) / 2; // acoth(2) = 0.5 * ln((2+1)/(2-1)) = 0.5 * ln(3)
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});