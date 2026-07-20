import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for a complex number where the mutation in d = a*a + b*b vs a*a + b/b would produce different results", () => {
    // For asech, the code computes d = a * a + b * b
    // The mutation changes it to d = a * a + b / b
    // For a = 1, b = 2: original d = 1 + 4 = 5, mutated d = 1 + 2/2 = 2
    // This affects the computation of new Complex(a/d, -b/d).acosh()
    
    const c = new Complex(1, 2);
    const result = c.asech();
    
    // Compute expected value manually:
    // asech(1+2i) = acosh(1/(1+2i)) = acosh((1-2i)/5)
    // = acosh(0.2 - 0.4i)
    // With original d=5: new Complex(1/5, -2/5).acosh() = new Complex(0.2, -0.4).acosh()
    // With mutated d=2: new Complex(1/2, -2/2).acosh() = new Complex(0.5, -1).acosh()
    
    // The original correct result for asech(1+2i):
    const expected = new Complex(1, 2).inverse().acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});