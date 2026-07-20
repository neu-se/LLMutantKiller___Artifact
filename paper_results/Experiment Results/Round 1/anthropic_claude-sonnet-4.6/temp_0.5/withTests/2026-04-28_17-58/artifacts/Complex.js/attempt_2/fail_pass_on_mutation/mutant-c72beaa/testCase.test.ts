import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot d=0 branch via underflow", () => {
  it("acot of a tiny complex number where d underflows should produce NaN with Infinity intermediate", () => {
    const tiny = 1e-200;
    // Verify underflow condition
    expect(tiny * tiny).toBe(0);
    // With a=tiny, b=tiny: d=0 branch is taken
    // Original: intermediate re = tiny/0 = Infinity → atan(Inf, -Inf) = NaN
    // Mutated:  intermediate re = tiny*0 = 0       → atan(0, -Inf) = NaN
    const result = new Complex(tiny, tiny).acot();
    expect(result.isNaN()).toBe(true);
  });
});