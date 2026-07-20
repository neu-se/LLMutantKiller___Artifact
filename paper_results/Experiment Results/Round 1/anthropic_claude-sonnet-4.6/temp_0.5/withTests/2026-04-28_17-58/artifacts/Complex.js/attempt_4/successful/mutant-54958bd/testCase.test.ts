import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh of a real number greater than 1, checking real part", () => {
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166 + 0i
    // In mutated code: tmp = res[""] = undefined
    // res['re'] = -res['im'] is computed correctly
    // res['im'] = undefined, but prototype has im: 0, so own property undefined shadows prototype
    // The real part should still be log(2+sqrt(3))
    // Let's try acosh of a complex number where re part would differ
    
    // For acosh(0.5), acos(0.5) = PI/3 + something*i with positive im
    // so the else branch is taken, not the if branch
    // For acosh(2+i), acos result may have negative im
    
    const result = new Complex(2, 1).acosh();
    const expected = new Complex(2, 1).acos();
    
    // Manually compute: if expected.im < 0, swap with negation
    // result.re should be -expected.im, result.im should be expected.re
    expect(result.re).toBeCloseTo(-expected.im, 10);
    expect(result.im).toBeCloseTo(expected.re, 10);
  });
});