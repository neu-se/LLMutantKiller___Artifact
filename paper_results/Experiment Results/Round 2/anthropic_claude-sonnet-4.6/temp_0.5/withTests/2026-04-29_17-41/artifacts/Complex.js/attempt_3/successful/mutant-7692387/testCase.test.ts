import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asinh mutation detection', () => {
  it('should not permanently mutate the original complex number after asinh', () => {
    const c = new Complex(3, 4);
    c.asinh(); // call asinh - original object should be restored
    
    // After asinh, the original object's im should be restored to 4
    expect(c.im).toBeCloseTo(4, 10);
  });
});