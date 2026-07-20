// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide when denominator has |real| < |imaginary|", () => {
    // Create a case that specifically triggers the mutated branch
    // where Math.abs(c) < Math.abs(d) in the div method
    const numerator = new Complex(1, 1); // 1 + 1i
    const denominator = new Complex(0.1, 1); // 0.1 + 1i (|0.1| < |1|)

    // Expected result calculated manually:
    // (1 + 1i)/(0.1 + 1i) = [(1*0.1 + 1*1)/(0.1^2 + 1^2)] + [(1*0.1 - 1*1)/(0.1^2 + 1^2)]i
    // = (0.1 + 1)/1.01 + (0.1 - 1)/1.01 i = 1.1/1.01 - 0.9/1.01 i
    const expectedRe = 1.1/1.01;
    const expectedIm = -0.9/1.01;

    // Perform division
    const result = numerator.div(denominator);

    // Verify the result matches expected values
    // The mutation changes (a + b * x) to (a + b / x) in the real part calculation
    // This will produce significantly different results when x != 1
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});