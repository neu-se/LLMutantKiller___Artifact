import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with one infinite operand", () => {
  it("finite plus infinity should return INFINITY not NaN", () => {
    const finite = new Complex(2, 3);
    const result = finite.add(Infinity, Infinity);
    // Original: first check is &&, so only both-infinite returns NaN
    // Second check (PLACEHOLDER) catches one-infinite case, returns INFINITY
    // Mutated: second check is false, falls through to arithmetic giving NaN/Infinity
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});