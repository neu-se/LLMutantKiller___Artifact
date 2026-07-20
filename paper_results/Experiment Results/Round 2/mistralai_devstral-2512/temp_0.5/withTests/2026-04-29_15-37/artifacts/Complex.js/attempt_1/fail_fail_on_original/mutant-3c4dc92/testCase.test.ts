// Test case to detect the mutation in the atanh method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute atanh for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // Expected result calculated using the correct formula
    const expectedRe = 0.2554128115193155;
    const expectedIm = 0.5493061443340548;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});