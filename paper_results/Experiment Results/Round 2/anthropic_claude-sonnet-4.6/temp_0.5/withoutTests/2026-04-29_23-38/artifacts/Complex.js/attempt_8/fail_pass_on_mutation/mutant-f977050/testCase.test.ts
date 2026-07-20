import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should not produce NaN imaginary part for acosh(2i)', () => {
    const result = new Complex(0, 2).acosh();
    
    // In original: res.im = -res.re (a finite number ~pi/2)
    // In mutated:  res.im = -res[""] = -undefined = NaN
    expect(result.im).not.toBeNaN();
    
    // Additionally verify the specific value to be certain
    // From previous runs we know im ≈ 1.5707963267948966 in original
    expect(result.im).toBeCloseTo(1.5707963267948966, 5);
  });
});