// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly handle division when denominator has |real| < |imaginary|", () => {
    // Create a case specifically designed to expose the mutation
    // where the mutation changes b * x to b / x in the real part calculation
    const numerator = new Complex(1, 0); // 1 + 0i (real number)
    const denominator = new Complex(0.5, 1); // 0.5 + 1i (|0.5| < |1| triggers the branch)

    // Expected result calculated manually:
    // (1 + 0i)/(0.5 + 1i) = [(1*0.5 + 0*1)/(0.5^2 + 1^2)] + [(0*0.5 - 1*1)/(0.5^2 + 1^2)]i
    // = (0.5 + 0)/1.25 + (0 - 1)/1.25 i = 0.5/1.25 - 1/1.25 i
    const expectedRe = 0.5/1.25;
    const expectedIm = -1/1.25;

    // Perform division
    const result = numerator.div(denominator);

    // Verify the result matches expected values
    // The mutation will cause the real part to be calculated incorrectly
    // when x != 1 (x = 1/0.5 = 2 in this case)
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});