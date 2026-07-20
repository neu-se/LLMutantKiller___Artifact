import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute the inverse cosecant of a complex number with non-zero magnitude", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // For c = 2, acsc(2) should be approximately asin(0.5) = PI/6
    const c = new Complex(2, 0);
    const result = c.acsc();
    
    // The original code computes d = a*a + b*b = 4, then returns new Complex(a/d, -b/d).asin()
    // which is new Complex(0.5, 0).asin() = asin(0.5) ≈ PI/6
    // The mutated code returns (false) which means it falls through to the alternative branch
    // with d=0 case, producing wrong results
    
    const expected = new Complex(Math.asin(0.5), 0);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});