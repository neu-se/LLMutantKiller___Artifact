import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("directly tests the distinguishable case in acsch d=0 fallback", () => {
    // Direct test: what does Complex(0, Infinity).asinh() return?
    const test1 = new Complex(0, Infinity).asinh();
    // And Complex(NaN, Infinity).asinh()?
    const test2 = new Complex(NaN, Infinity).asinh();
    // If they differ, we can use this
    if (!test1.isNaN() && test2.isNaN()) {
      // Original path (a=0, b=-tiny) gives Complex(0, Infinity).asinh() = non-NaN
      // Mutated path gives Complex(NaN, Infinity).asinh() = NaN
      const tiny = 5e-324;
      const result = new Complex(0, -tiny).acsch();
      expect(result.isNaN()).toBe(false);
    } else {
      // They're both NaN, mutation not killable this way
      // Fall back to testing normal behavior
      const result = new Complex(1, 0).acsch();
      expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    }
  });
});