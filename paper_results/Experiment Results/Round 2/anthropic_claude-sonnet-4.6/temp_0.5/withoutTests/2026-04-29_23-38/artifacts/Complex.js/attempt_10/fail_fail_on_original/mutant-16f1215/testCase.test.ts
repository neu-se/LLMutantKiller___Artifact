import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("asin(0 - Infinity*i) should return (0, -Infinity)", () => {
    // Direct test of asin to understand behavior
    const asinResult = new Complex(0, -Infinity).asin();
    // If this is (0, -Infinity), then original acsc(0, 1e-200) = (0, -Infinity)
    // and mutated = NaN
    expect(asinResult.re).toBe(0);
    expect(asinResult.im).toBe(-Infinity);
  });
});