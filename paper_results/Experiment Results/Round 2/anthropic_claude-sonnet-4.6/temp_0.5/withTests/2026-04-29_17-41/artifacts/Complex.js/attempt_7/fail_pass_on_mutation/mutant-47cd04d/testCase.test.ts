import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with one infinite operand", () => {
  it("should return INFINITY when only one operand is infinite", () => {
    // If first check is &&(both infinite=NaN), second check catches one-infinite
    // With mutation if(false), falls through to arithmetic
    const finite = new Complex(1, 2);
    const result = finite.add(new Complex(Infinity, Infinity));
    // In original: first check (&&) doesn't fire, second check fires -> INFINITY
    // In mutated: second check is false -> arithmetic: 1+Inf=Inf, 2+Inf=Inf -> isInfinite but via NaN? 
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});