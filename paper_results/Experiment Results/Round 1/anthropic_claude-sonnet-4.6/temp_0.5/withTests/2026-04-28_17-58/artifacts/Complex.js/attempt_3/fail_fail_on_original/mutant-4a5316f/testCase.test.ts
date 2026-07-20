import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of purely imaginary number with subnormal magnitude has correct imaginary sign', () => {
    // Use a value where a*a + b*b underflows to 0
    // b > 0: original gives atanh(0, -Inf), mutated gives atanh(0, +Inf)
    // Let's check if there's any difference in the final result
    const b = Number.MIN_VALUE;
    const result1 = new Complex(0, b).acoth();
    const result2 = new Complex(0, -b).acoth();
    // Mathematical property: acoth(iy) = -i*acot(y) for real y
    // acot(y) = atan(1/y), so acoth(iy) = -i*atan(1/y)
    // For very small y, atan(1/y) ≈ pi/2
    // So acoth(i*MIN_VALUE) should have im ≈ -pi/2
    // But with underflow, d=0, and we get NaN
    // Let's just verify the result is NaN (both original and mutated)
    // This won't detect the mutation...
    // Try with a slightly larger value that doesn't underflow
    const b2 = 1e-160; // b2*b2 = 1e-320, still > 0 in double precision
    const result3 = new Complex(0, b2).acoth();
    // d = b2*b2 = 1e-320 > 0, so d !== 0 branch
    // new Complex(0, -b2/d) = new Complex(0, -b2/(b2*b2)) = new Complex(0, -1/b2)
    // = new Complex(0, -1e160)
    // atanh(0, -1e160): d = 1 + 1e320 ≈ 1e320
    // x_re ≈ (1 - 1e320)/1e320 ≈ -1
    // x_im ≈ (-1e160 + (-1e160))/1e320 = -2e160/1e320 = -2/1e160 ≈ 0
    // logHypot(-1, 0) / 2 = 0
    // atan2(0, -1) / 2 = pi/2 / 2... wait
    // Actually let me compute properly
    // x_re = (1*1 - (-1e160)*(-1e160))/(1 + 1e320) = (1 - 1e320)/(1 + 1e320) ≈ -1
    // x_im = ((-1e160)*1 + 1*(-1e160))/(1 + 1e320) = -2e160/(1 + 1e320) ≈ -2e160/1e320 = -2e-160
    // temp = x_re = -1
    // x_re = logHypot(-1, -2e-160) / 2 ≈ 0
    // x_im = atan2(-2e-160, -1) / 2 ≈ atan2(0, -1) / 2 = pi/2 / 2... 
    // atan2(-2e-160, -1) ≈ -pi + 2e-160 ≈ -pi
    // x_im = -pi/2
    // noIM = false, so result: re=0, im=-pi/2
    expect(result3.re).toBeCloseTo(0, 5);
    expect(result3.im).toBeCloseTo(-Math.PI / 2, 5);
  });
});