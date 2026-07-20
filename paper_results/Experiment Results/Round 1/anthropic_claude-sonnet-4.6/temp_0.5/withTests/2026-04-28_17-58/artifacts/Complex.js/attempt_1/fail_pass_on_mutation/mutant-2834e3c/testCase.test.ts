import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should compute asech correctly for a purely imaginary number where b !== 0", () => {
    // Test asech with a purely imaginary number
    // asech(i) should give a specific complex result
    // For z = i (re=0, im=1), d = 0*0 + 1*1 = 1 (non-zero), so it takes the first branch
    // a/d = 0, -b/d = -1, so we compute new Complex(0, -1).acosh()
    const z = new Complex(0, 1);
    const result = z.asech();
    
    // asech(i) = acosh(1/i) = acosh(-i)
    // acosh(-i) = log(-i + sqrt(-i^2 - 1)) = log(-i + sqrt(2))
    // Expected: re = log(sqrt(2) + 1) ≈ 0.8813736, im = -pi/2 ≈ -1.5707963
    // Actually let's compute: new Complex(0, -1).acosh()
    // acos(-i): t1 = sqrt((-1)^2 - 0^2 + 1, -2*0*(-1)) = sqrt(2, 0)
    // t2 = log(sqrt(2) - (-1), 0 + 0) = log(sqrt(2)+1, 0)
    // acos result: re = PI/2 - 0 = PI/2, im = log(sqrt(2)+1)
    // acosh: im <= 0? No, im = log(sqrt(2)+1) > 0
    // so: tmp = im, im = -re, re = tmp
    // result: re = log(sqrt(2)+1), im = -PI/2
    
    const expectedRe = Math.log(Math.sqrt(2) + 1);
    const expectedIm = -Math.PI / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});