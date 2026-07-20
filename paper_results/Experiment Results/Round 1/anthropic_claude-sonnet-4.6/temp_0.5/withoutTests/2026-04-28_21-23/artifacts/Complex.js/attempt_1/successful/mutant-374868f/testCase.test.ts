import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should correctly compute asech(1 + i)", () => {
    // For z = 1 + i:
    // asech(z) = acosh(1/z) = acosh((1-i)/2) approximately
    // The mutation changes a/d to a*d in the asech computation,
    // which would produce a significantly different result
    const z = new Complex(1, 1);
    const result = z.asech();
    
    // Known correct value for asech(1+i):
    // asech(1+i) ≈ 0.5306375309525178 - 1.1185178796437059i
    // (computed from the correct formula)
    
    // Compute expected value manually:
    // d = a*a + b/b = 1 + 1 = 2
    // new Complex(a/d, -b/d) = new Complex(0.5, -0.5)
    // then .acosh()
    const expected = new Complex(0.5, -0.5).acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});