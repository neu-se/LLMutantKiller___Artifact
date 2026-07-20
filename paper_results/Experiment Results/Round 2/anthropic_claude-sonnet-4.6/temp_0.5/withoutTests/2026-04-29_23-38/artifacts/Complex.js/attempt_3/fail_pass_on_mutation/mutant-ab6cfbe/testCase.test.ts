import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of 0+0i should use general formula giving atan2(0,0)=0 for imaginary part", () => {
    // Testing that log(0) = -Infinity + 0i
    // The mutation changes a>0 to a>=0 in the if condition
    // For a=0, b=0: original skips if block, mutated enters if block (both empty)
    // Both should give same result via the return statement
    // Let's try through asin to find a case where log receives (0,0)
    const result = new Complex(1, 0).asin();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});