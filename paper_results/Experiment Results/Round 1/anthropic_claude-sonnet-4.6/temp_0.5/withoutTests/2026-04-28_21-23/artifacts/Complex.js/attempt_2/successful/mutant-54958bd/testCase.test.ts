import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a purely imaginary number", () => {
    // acosh(i) = log(i + sqrt(i^2 - 1)) = log(i + sqrt(-2)) 
    // Expected: re ≈ 0.8813735870195430, im ≈ π/2 ≈ 1.5707963267948966
    const result = new Complex(0, 1).acosh();
    
    // With the mutation, res['im'] would be set to undefined (from res[""]),
    // causing the result to be incorrect
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(0.8813735870195430, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});