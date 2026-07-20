import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc with NaN input", () => {
  it("should return NaN complex when input is NaN", () => {
    const result = new Complex(NaN, 0).acsc();
    // Original: im part = 0 (from (b !== 0) ? -b/0 : 0 where b=0)
    // Mutated: im part = NaN (from (b === 0) ? -b/0 : 0 where b=0, so -0/0 = NaN)
    expect(isNaN(result.re)).toBe(true);
    expect(result.im).toBe(0);
  });
});