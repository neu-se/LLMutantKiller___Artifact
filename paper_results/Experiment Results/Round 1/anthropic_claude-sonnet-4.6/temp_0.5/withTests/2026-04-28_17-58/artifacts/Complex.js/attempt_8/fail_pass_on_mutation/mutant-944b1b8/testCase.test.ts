import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec of 2i should not produce NaN", () => {
    const result = new Complex(0, 2).asec();
    // Original: produces a valid complex number (approx 1.5707... + 0.4812...i)
    // Mutated: new Complex(NaN, -Infinity).acos() -> NaN
    expect(result.isNaN()).toBe(false);
  });
});