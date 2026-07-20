import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should negate imaginary part when real part > 1 and imaginary part is 0", () => {
    // When a > 1 and b === 0, noIM is true, and the original code negates x['im']
    // The mutation removes this negation, so x['im'] stays as-is instead of being negated
    const c = new Complex(2, 0);
    const result = c.atanh();
    
    // atanh(2) = 0.5 * log((1+2)/(1-2)) = 0.5 * log(-3) 
    // = 0.5 * (log(3) + i*pi)
    // So re = log(3)/2 ≈ 0.5493, im = pi/2 ≈ 1.5708
    // But with noIM=true, original code negates im: im = -pi/2 ≈ -1.5708
    
    // The original result should have negative imaginary part
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});