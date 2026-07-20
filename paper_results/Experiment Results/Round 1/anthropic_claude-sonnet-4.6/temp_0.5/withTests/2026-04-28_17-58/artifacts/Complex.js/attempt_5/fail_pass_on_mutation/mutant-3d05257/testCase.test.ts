import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should produce correct imaginary part for acosh(2)", () => {
    // Original: tmp = res['re'], then res['re'] = -res['im'], res['im'] = tmp (old re)
    // Mutated:  tmp = res[""] = undefined, then res['re'] = -res['im'], res['im'] = undefined = NaN
    const result = new Complex(2, 0).acosh();
    
    // acosh(2) = ln(2 + sqrt(3)) + 0i
    expect(result.im).toBeCloseTo(0, 10);
  });
});