import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation in acsc d=0 branch', () => {
    // Use 1e-200: 1e-200 * 1e-200 = 1e-400 which underflows to 0
    // a=0, b=1e-200: early return skipped, d = 0 + 0 = 0
    // original: new Complex(0, -1e-200/0).asin() = new Complex(0, -Inf).asin()
    // mutated:  new Complex(0, +1e-200/0).asin() = new Complex(0, +Inf).asin()
    const b = 1e-200;
    const result = new Complex(0, b).acsc();
    
    // Manually compute what original should give: asin(0, -Inf)
    // t1 = sqrt(Inf+1, 0) = (Inf, 0)
    // t2 = log(Inf-(-Inf), 0) = log(Inf, 0) = (Inf, 0)  
    // result = (t2.im, -t2.re) = (0, -Inf)
    const expected = new Complex(0, -Infinity).asin();
    
    expect(result.re).toBe(expected.re);
    expect(result.im).toBe(expected.im);
  });
});