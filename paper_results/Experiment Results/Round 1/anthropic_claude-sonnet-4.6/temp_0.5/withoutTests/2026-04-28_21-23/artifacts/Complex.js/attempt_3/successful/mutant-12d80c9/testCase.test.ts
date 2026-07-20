import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("returns correct result for Number.MIN_VALUE where d underflows to zero", () => {
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, 0);
    const result = c.asech();

    // Compute what mutated code gives: new Complex(0, 0).acosh()
    const mutatedResult = new Complex(0, 0).acosh();
    
    // Compute what original code gives: new Complex(Infinity, 0).acosh()
    const originalResult = new Complex(Infinity, 0).acosh();
    
    // Log to understand values - result should match original, not mutated
    // If original gives NaN and mutated gives something else, check NaN
    expect(result.re).toBe(originalResult.re);
    expect(result.im).toBe(originalResult.im);
  });
});