import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of NaN+1i should have infinite imaginary part", () => {
    const result = new Complex(NaN, 1).acsc();
    // Original: constructs Complex(0, -Infinity).asin() -> {re:0, im:-Infinity}
    // Mutated: constructs Complex(0, 0).asin() -> {re:0, im:0}
    expect(isFinite(result.im)).toBe(false);
  });
});