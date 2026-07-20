import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with infinity", () => {
  it("should return Infinity when adding finite number to Infinity, with correct re and im values", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    const result = inf.add(finite);
    // In the original code, INFINITY is returned (re=Infinity, im=Infinity)
    // In the mutated code, the if block is empty so execution falls through to:
    // new Complex(Infinity + 3, Infinity + 4) which is still Infinity, Infinity
    // But when z is Infinite and this is finite, the result should also be Infinity
    const result2 = finite.add(inf);
    expect(result2.re).toBe(Infinity);
    expect(result2.im).toBe(Infinity);
    expect(result2.isInfinite()).toBe(true);
    // The key difference: with mutation, result2 = new Complex(3+Infinity, 4+Infinity)
    // which equals new Complex(Infinity, Infinity) - same result
    // Let's try with a NaN scenario that differs
    // When this is finite and z is infinite, mutated code returns new Complex(finite + Infinity)
    // which is still Infinity... need different approach
    // The real difference: when this is finite (not infinite) and z is infinite,
    // original returns Complex.INFINITY (the singleton), mutated returns new Complex(Infinity, Infinity)
    // Both isInfinite() === true, so we need to check something else
    // Actually the mutated code falls through to new Complex(this.re + z.re, this.im + z.im)
    // = new Complex(3 + Infinity, 4 + Infinity) = new Complex(Infinity, Infinity)
    // This is still infinite... Let me reconsider.
    // The mutation makes the if block empty, so it falls through to the addition.
    // For finite + infinite: new Complex(finite + Infinity, finite + Infinity) = Infinity - same
    // For infinite + finite: new Complex(Infinity + finite, Infinity + finite) = Infinity - same
    // The difference only matters if we can get NaN from the addition
    // e.g., Infinity + (-Infinity) but that's the two-infinity case handled before
    // Wait - what about a complex where only one component is infinite?
    // Let's try: this = {re: Infinity, im: 0} which isInfinite() = true (not finite, not NaN)
    // z = {re: 1, im: 0} which isInfinite() = false
    // Original: returns Complex.INFINITY = {re: Infinity, im: Infinity}
    // Mutated: returns new Complex(Infinity + 1, 0 + 0) = {re: Infinity, im: 0}
    const halfInf = new Complex(Infinity, 0);
    const one = new Complex(1, 0);
    const result3 = halfInf.add(one);
    // Original returns Complex.INFINITY with im = Infinity
    // Mutated returns new Complex(Infinity, 0) with im = 0
    expect(result3.im).toBe(Infinity);
  });
});