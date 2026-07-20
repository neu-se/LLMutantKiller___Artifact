import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    // For a real number a > 1 and b === 0, atanh should return a complex number
    // with im set to -x['im'] (which zeros out the imaginary part due to the noIM condition)
    // The mutation changes x['im'] = -x['im'] to x['im'] = -x[""] which is -undefined = NaN
    const result = new Complex(2, 0).atanh();
    
    // atanh(2) should have imaginary part of PI/2 (or -PI/2)
    // The noIM branch sets x['im'] = -x['im'] to negate the imaginary part
    // With the mutation, x['im'] becomes NaN
    expect(isNaN(result.im)).toBe(false);
    expect(Math.abs(result.im)).toBeCloseTo(Math.PI / 2, 10);
  });
});