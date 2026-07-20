import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute the inverse cosecant of a complex number with non-zero magnitude", () => {
    // acsc(2) = asin(1/2) = pi/6 ≈ 0.5235987755982988
    const c = new Complex(2, 0);
    const result = c.acsc();
    
    // The original code computes d = a*a + b*b = 4, then returns new Complex(a/d, -b/d).asin()
    // which is new Complex(0.5, 0).asin() = asin(0.5) = pi/6
    // The mutated code returns (false) branch which would be new Complex(0, 0).asin() = 0
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});