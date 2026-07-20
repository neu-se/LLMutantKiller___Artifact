import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should produce imaginary part of pi/2 for acosh(2i)', () => {
    // acosh(2i) triggers the else branch (acos(2i).im > 0)
    // Original else: tmp=res.re; res.im=-res.re; res.re=tmp
    //   -> im becomes -res.re (finite value, approximately pi/2)
    // Mutated else:  res.im = -res[""] = NaN
    //   -> im becomes NaN
    
    const result = new Complex(0, 2).acosh();
    
    // In original code im should be approximately pi/2
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});