// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |real| < |imaginary| in denominator", () => {
    // Create a case where |c| < |d| in the div method to trigger the mutated branch
    const numerator = new Complex(5, 3); // 5 + 3i
    const denominator = new Complex(1, 4); // 1 + 4i (|1| < |4| will trigger the mutated branch)

    // Expected result calculated manually:
    // (5 + 3i)/(1 + 4i) = [(5*1 + 3*4)/(1^2 + 4^2)] + [(3*1 - 5*4)/(1^2 + 4^2)]i
    // = (5 + 12)/17 + (3 - 20)/17 i = 17/17 - 17/17 i = 1 - i
    const expected = new Complex(1, -1);

    // Perform division
    const result = numerator.div(denominator);

    // Verify the result matches expected values
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});