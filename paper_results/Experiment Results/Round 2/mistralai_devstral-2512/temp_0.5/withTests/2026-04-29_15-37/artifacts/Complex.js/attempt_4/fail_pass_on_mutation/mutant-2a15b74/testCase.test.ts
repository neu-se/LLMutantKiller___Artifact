// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly handle division when denominator has small real component", () => {
    // Create a case specifically designed to trigger the mutated branch
    // where |c| < |d| in the div method (Math.abs(c) < Math.abs(d))
    const numerator = new Complex(2, 3); // 2 + 3i
    const denominator = new Complex(0.5, 2); // 0.5 + 2i (|0.5| < |2|)

    // Expected result calculated manually:
    // (2 + 3i)/(0.5 + 2i) = [(2*0.5 + 3*2)/(0.5^2 + 2^2)] + [(3*0.5 - 2*2)/(0.5^2 + 2^2)]i
    // = (1 + 6)/4.25 + (1.5 - 4)/4.25 i = 7/4.25 - 2.5/4.25 i
    const expectedRe = 7/4.25;
    const expectedIm = -2.5/4.25;

    // Perform division
    const result = numerator.div(denominator);

    // Verify the result matches expected values
    // The mutation changes b * x to b / x in the real part calculation
    // This will produce different results when x != 1
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});