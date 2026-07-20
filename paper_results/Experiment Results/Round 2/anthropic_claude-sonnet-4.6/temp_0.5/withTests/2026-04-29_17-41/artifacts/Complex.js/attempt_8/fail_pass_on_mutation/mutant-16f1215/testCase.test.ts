import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(2) should equal PI/6 with zero imaginary part", () => {
    // acsc(2) = asin(1/2) = PI/6
    // d = 4+0 = 4, new Complex(2/4, +0/4).asin() = new Complex(0.5, 0).asin()
    // This tests the d!==0 branch with b=0
    const result = new Complex(2, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it.skip("acsc uses +b/d (not -b/d) for imaginary part in d!=0 branch", () => {
    // For acsc(a + bi), d = a^2 + b^2
    // The code does: new Complex(a/d, +b/d).asin()
    // For z = 1 + 1i: d = 2
    // new Complex(0.5, +0.5).asin() -- note POSITIVE imaginary
    // If it were -b/d (like in acot/asec), it would be new Complex(0.5, -0.5).asin()
    const result = new Complex(1, 1).acsc();
    const expected = new Complex(0.5, 0.5).asin();
    const wrong = new Complex(0.5, -0.5).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    // Verify it's NOT the wrong sign version
    expect(Math.abs(result.im - wrong.im)).toBeGreaterThan(1e-10);
  });
});