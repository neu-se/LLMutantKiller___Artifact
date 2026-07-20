import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sqrt mutation test', () => {
  it('sqrt of a negative imaginary number should give correct result', () => {
    // sqrt(-i) = sqrt(0 - 1i), a=0, b=-1
    // r = 1, a<=0 so re = |b|/sqrt(2*(r-a)) = 1/sqrt(2) 
    // a<=0 so im = 0.5*sqrt(2*(r-a)) = 0.5*sqrt(2) = 1/sqrt(2), but b<0 so -im
    const z = new Complex(0, -1);
    const result = z.sqrt();
    expect(result.re).toBeCloseTo(1/Math.sqrt(2), 10);
    expect(result.im).toBeCloseTo(-1/Math.sqrt(2), 10);
  });
});