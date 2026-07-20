import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh of a real number greater than 1", () => {
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    const result = new Complex(2, 0).acosh();
    
    // The real part should be approximately log(2 + sqrt(3))
    const expected = Math.log(2 + Math.sqrt(3));
    
    // In the mutated code, res['im'] would be undefined because tmp = res[""] = undefined
    // So result.im would be undefined instead of 0
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // This check ensures im is a number, not undefined
    expect(typeof result.im).toBe("number");
    expect(isNaN(result.im)).toBe(false);
  });
});