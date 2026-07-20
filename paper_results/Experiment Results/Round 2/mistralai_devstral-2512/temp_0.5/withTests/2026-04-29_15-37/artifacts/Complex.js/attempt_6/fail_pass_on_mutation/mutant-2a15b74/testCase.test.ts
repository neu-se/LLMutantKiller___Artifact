// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly handle division with specific values that expose the mutation", () => {
    // Create a case specifically designed to expose the mutation
    // where the mutation changes b * x to b / x in the real part calculation
    const numerator = new Complex(3, 4); // 3 + 4i
    const denominator = new Complex(1, 2); // 1 + 2i (|1| < |2| triggers the branch)

    // Expected result calculated manually:
    // (3 + 4i)/(1 + 2i) = [(3*1 + 4*2)/(1^2 + 2^2)] + [(4*1 - 3*2)/(1^2 + 2^2)]i
    // = (3 + 8)/5 + (4 - 6)/5 i = 11/5 - 2/5 i
    const expectedRe = 11/5;
    const expectedIm = -2/5;

    // Perform division
    const result = numerator.div(denominator);

    // Verify the result matches expected values
    // The mutation will cause the real part to be calculated incorrectly
    // when x != 1 (x = d/c = 2/1 = 2 in this case)
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});