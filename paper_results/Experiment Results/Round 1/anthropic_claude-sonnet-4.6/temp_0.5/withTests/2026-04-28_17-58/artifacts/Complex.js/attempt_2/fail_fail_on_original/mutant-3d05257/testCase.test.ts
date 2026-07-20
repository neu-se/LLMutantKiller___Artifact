import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh of a purely imaginary number", () => {
    // acosh(i) where the acos result has im <= 0, triggering the mutation branch
    // For input i (0 + 1i), acos(i) has a negative imaginary part
    // Original: res['re'] = -res['im'] (a valid number)
    // Mutated:  res['re'] = -res[""]  = -undefined = NaN
    const result = new Complex(0, 1).acosh();
    
    // acosh(i) = log(i + sqrt(i^2 + 1)) = log(i + sqrt(-1+1)) = log(i + 0) = log(i) = i*pi/2
    // So re should be 0, im should be pi/2
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});