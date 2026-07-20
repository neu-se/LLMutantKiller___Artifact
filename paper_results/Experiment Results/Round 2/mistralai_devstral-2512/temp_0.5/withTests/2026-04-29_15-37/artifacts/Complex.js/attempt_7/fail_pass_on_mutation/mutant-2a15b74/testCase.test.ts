// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when denominator has |real| < |imaginary|", () => {
    // Create a case that will expose the mutation where b * x becomes b / x
    const numerator = new Complex(2, 3); // 2 + 3i
    const denominator = new Complex(1, 3); // 1 + 3i (|1| < |3| triggers the branch)

    // Expected result calculated manually:
    // (2 + 3i)/(1 + 3i) = [(2*1 + 3*3)/(1^2 + 3^2)] + [(3*1 - 2*3)/(1^2 + 3^2)]i
    // = (2 + 9)/10 + (3 - 6)/10 i = 11/10 - 3/10 i
    const expectedRe = 11/10;
    const expectedIm = -3/10;

    // Perform division
    const result = numerator.div(denominator);

    // Verify the result matches expected values
    // The mutation changes (a + b * x) to (a + b / x) in the real part calculation
    // With x = 3/1 = 3, this will produce different results
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});