import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation via acsch with underflowing d", () => {
    // Verify d actually underflows
    const a = 1e-200;
    const b = -1e-200;
    const d = a * a + b * b;
    // If d === 0, original uses (b !== 0) ? -b/0 : 0 = +Infinity
    // mutated uses 0
    // Need to find what asinh gives in each case
    const result = new Complex(a, b).acsch();
    const resultFromMutatedPath = new Complex(0, 0).asinh();
    // They should differ
    expect(result.equals(resultFromMutatedPath)).toBe(false);
  });
});