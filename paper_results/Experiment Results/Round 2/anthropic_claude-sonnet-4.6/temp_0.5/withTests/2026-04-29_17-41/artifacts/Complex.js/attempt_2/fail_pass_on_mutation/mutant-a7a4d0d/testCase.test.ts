import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return positive real part for acosh(-2)", () => {
    // acosh(-2): acos(-2) returns {re: π, im: ~1.317}
    // Since im > 0, original uses else branch: re = im (~1.317), im = -re (-π)
    // Mutated code always uses if branch: re = -im (-1.317), im = re (π)
    // So original re ≈ +1.317, mutated re ≈ -1.317
    const result = new Complex(-2, 0).acosh();
    expect(result.re).toBeGreaterThan(0);
  });
});