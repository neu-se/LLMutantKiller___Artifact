import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth(2) correctly", () => {
    // For normal inputs d > 0, original uses first branch (d !== 0 is true)
    // Mutated also uses first branch (always true)
    // Both give same result for d > 0... 
    // Need to find where they differ
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});