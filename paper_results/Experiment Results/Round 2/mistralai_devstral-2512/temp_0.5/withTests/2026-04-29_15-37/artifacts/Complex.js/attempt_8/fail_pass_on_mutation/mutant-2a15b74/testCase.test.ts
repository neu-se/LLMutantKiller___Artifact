// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly handle division when denominator has |real| < |imaginary|", () => {
    // Create a case specifically designed to expose the mutation
    // where the mutation changes b * x to b / x in the real part calculation
    const numerator = new Complex(1, 2); // 1 + 2i
    const denominator = new Complex(0.5, 2); // 0.5 + 2i (|0.5| < |2| triggers the branch)

    // Expected result calculated manually:
    // (1 + 2i)/(0.5 + 2i) = [(1*0.5 + 2*2)/(0.5^2 + 2^2)] + [(2*0.5 - 1*2)/(0.5^2 + 2^2)]i
    // = (0.5 + 4)/4.25 + (1 - 2)/4.25 i = 4.5/4.25 - 1/4.25 i
    const expectedRe = 4.5/4.25;
    const expectedIm = -1/4.25;

    // Perform division
    const result = numerator.div(denominator);

    // Verify the result matches expected values
    // The mutation will cause the real part to be calculated incorrectly
    // when x != 1 (x = 2/0.5 = 4 in this case)
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});