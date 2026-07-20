import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return a non-NaN real part for acosh of a complex number where the acos branch with im <= 0 is taken", () => {
    // acosh(0) - for input 0, acos(0) = pi/2 + 0i, im=0 <= 0, so the mutation branch is taken
    // In original: res.re = -res.im = 0, res.im = tmp (which is res.re = pi/2)
    // In mutated: res.re = -res[""] = -undefined = NaN
    const result = new Complex(0, 0).acosh();
    
    expect(isNaN(result.re)).toBe(false);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});