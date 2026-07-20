import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asinh mutation detection', () => {
  it('should correctly compute asinh of a complex number with nonzero imaginary part', () => {
    // asinh(0 + 1i) should equal i * pi/2
    // Using a value where im != 0 to expose the mutation
    const c = new Complex(0, 0.5);
    const result = c.asinh();
    
    // asinh(0 + 0.5i) = i * asin(0.5) = i * pi/6
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 6, 10);
  });
});