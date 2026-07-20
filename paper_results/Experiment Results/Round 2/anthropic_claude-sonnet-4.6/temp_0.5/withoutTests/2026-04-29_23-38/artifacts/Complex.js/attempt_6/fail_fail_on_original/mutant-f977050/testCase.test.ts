import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should produce finite imaginary part for acosh(2i)', () => {
    // For acosh(2i), acos(2i) should have im > 0, triggering else branch
    // Original else: tmp=res.re; res.im=-res.re; res.re=tmp -> im is finite
    // Mutated else:  res.im=-res[""]=-undefined=NaN -> im is NaN
    
    const result = new Complex(0, 2).acosh();
    
    // In original code im should be a specific negative finite number
    // In mutated code im should be NaN
    const expectedIm = result.re; // just check it's not NaN
    expect(Number.isFinite(result.im)).toBe(true);
    expect(result.im).toBeLessThan(0);
  });
});