// Test case to detect the mutation in the div method of Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| < |d|", () => {
    // Create two complex numbers where |c| < |d| to trigger the mutated branch
    const a = new Complex(1, 2); // Numerator: 1 + 2i
    const b = new Complex(3, 4); // Denominator: 3 + 4i

    // Expected result calculated manually:
    // (1 + 2i) / (3 + 4i) = (1*3 + 2*4)/(3^2 + 4^2) + (2*3 - 1*4)/(3^2 + 4^2)i
    // = (3 + 8)/25 + (6 - 4)/25 i = 11/25 + 2/25 i
    const expected = new Complex(11/25, 2/25);

    // Perform division
    const result = a.div(b);

    // Verify the result matches expected values within a small epsilon
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});