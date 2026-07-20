import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(0 + NaN*i) re part should be 0 not NaN", () => {
    const result = new Complex(0, NaN).acot();
    // Original: falls to else, re = (0 !== 0) ? 0/0 : 0 = 0, then atan(0+NaN*i)
    // Mutated: falls to else, re = (0 === 0) ? 0/0 : 0 = NaN, then atan(NaN+NaN*i)
    // In original, atan(0 + NaN*i): a=0, b=NaN, d = 0 + (1-NaN)^2 = NaN
    // t1 = new Complex((1 - NaN - 0)/NaN, -0/NaN).log() => NaN
    // Result should differ between original and mutant
    expect(isNaN(result.re)).toBe(false);
  });
});