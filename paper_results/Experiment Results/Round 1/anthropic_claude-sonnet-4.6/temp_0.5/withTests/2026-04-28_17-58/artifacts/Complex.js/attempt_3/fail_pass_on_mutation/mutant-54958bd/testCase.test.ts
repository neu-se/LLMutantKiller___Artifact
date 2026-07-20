import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return a finite imaginary part for acosh(2)", () => {
    // acosh(2) should equal log(2 + sqrt(3)) + 0i
    // In the mutated code, res['im'] = res[""] = undefined
    const result = new Complex(2, 0).acosh();
    
    // In mutated code, result.im is undefined, so Number.isFinite(undefined) === false
    expect(Number.isFinite(result.im)).toBe(true);
  });
});