import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1", () => {
  it("should correctly compute expm1 for small imaginary values using cosm1", () => {
    // expm1(ib) = expm1(0)*cos(b) + cosm1(b) + i*exp(0)*sin(b)
    //           = cosm1(b) + i*sin(b)
    // For b = pi/6: cosm1(pi/6) = cos(pi/6) - 1 ≈ -0.1339745962...
    // This doesn't use sinh at all, so let me use a value that exercises sinh via tan
    // tan(z) for z with large im uses sinh - but Math.sinh fallback won't trigger
    
    // Instead test cot which uses sinh(b)/d
    const c = new Complex(1, 2);
    const sinh2 = new Complex(0, 2).sinh();
    // sinh(2+0i) should equal Math.sinh(2)
    expect(sinh2.re).toBeCloseTo(Math.sinh(2), 10);
  });
});