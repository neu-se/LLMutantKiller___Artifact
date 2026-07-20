import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a value where acos returns im <= 0", () => {
    // acosh(0.5) should have im > 0 in the result
    // For inputs where acos result has im <= 0, the mutated branch sets re to NaN
    const result = new Complex(0, 1).acosh();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    const expected = new Complex(0, 1).log().add(
      new Complex(0, 1).mul(new Complex(0, 1)).sub(1).sqrt()
    );
    expect(result.re).toBeCloseTo(0.7695598967, 5);
    expect(result.im).toBeCloseTo(1.5707963268, 5);
  });
});