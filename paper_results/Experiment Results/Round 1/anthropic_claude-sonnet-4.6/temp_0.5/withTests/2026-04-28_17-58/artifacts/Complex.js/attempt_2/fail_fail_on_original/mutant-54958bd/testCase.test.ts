import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh(2) with a finite imaginary part of 0", () => {
    // acosh(2) should equal log(2 + sqrt(3)) + 0i
    const result = new Complex(2, 0).acosh();
    
    // In the mutated code, res['im'] = res[""] = undefined, so result.im becomes undefined
    // The strict equality check will fail if im is undefined
    expect(result.im).toBe(0);
  });
});