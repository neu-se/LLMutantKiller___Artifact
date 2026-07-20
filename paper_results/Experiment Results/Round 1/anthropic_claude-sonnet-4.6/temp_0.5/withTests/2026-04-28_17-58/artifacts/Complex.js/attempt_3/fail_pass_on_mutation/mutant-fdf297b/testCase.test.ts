import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method", () => {
  it("should return Infinity when subtracting a finite number from Infinity (only one operand infinite)", () => {
    // Original: first check uses ||, so Infinity - finite = NaN, then second check never reached
    // BUT wait - the comment says "Infinity - Infinity = NaN" suggesting || was meant for both-infinite
    // Mutated: first check uses &&, only both-infinite = NaN; one-infinite falls to second check = Infinity
    // So in mutated: Infinity - finite = Infinity
    // In original: Infinity - finite = NaN
    // Test expects Infinity (mutated behavior) to NOT equal NaN
    const result = new Complex(Infinity, Infinity).sub(new Complex(1, 0));
    expect(result.isInfinite()).toBe(true);
  });
});