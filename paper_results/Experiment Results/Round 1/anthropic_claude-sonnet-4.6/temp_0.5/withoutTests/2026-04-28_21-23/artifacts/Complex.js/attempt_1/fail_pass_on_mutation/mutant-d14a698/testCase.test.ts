import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec function', () => {
  it('should compute asec correctly for a purely imaginary number with negative imaginary part', () => {
    // asec(i) = acos(1/i) = acos(-i)
    // For z = i (re=0, im=1), d = 0+1 = 1
    // asec(i) calls new Complex(0/1, -1/1).acos() = new Complex(0, -1).acos()
    // acos(-i): a=0, b=-1
    // t1 = sqrt((-1)^2 - 0^2 + 1, -2*0*(-1)) = sqrt(2, 0) = (sqrt(2), 0)
    // t2 = log(sqrt(2) - (-1), 0 + 0) = log(sqrt(2)+1, 0) = (log(sqrt(2)+1), 0)
    // acos = (PI/2 - 0, log(sqrt(2)+1))
    // So asec(i) should have im = log(sqrt(2)+1) > 0
    const result = new Complex(0, 1).asec();
    // The imaginary part should be positive (log(sqrt(2)+1) ≈ 0.8814)
    expect(result.im).toBeCloseTo(Math.log(Math.sqrt(2) + 1), 10);
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});