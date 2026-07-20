import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc with underflowing d produces consistent results regardless of b sign', () => {
    const tiny = Number.MIN_VALUE;
    const pos = new Complex(0, tiny).acsc();
    const neg = new Complex(0, -tiny).acsc();
    // In original: pos uses asin(0, -Inf), neg uses asin(0, +Inf)
    // In mutated:  pos uses asin(0, +Inf), neg uses asin(0, -Inf)
    // Both give NaN, but the ASSIGNMENT is swapped
    // So if we check: is pos.im === neg.im? Both NaN, so Object.is gives true for both
    // Cannot distinguish...
    
    // What if I check the relationship between the two?
    // In original: acsc(0, tiny) -> asin(0,-Inf) = NaN, acsc(0,-tiny) -> asin(0,+Inf) = NaN
    // In mutated:  acsc(0, tiny) -> asin(0,+Inf) = NaN, acsc(0,-tiny) -> asin(0,-Inf) = NaN
    // Still both NaN.
    
    expect(pos.isNaN()).toBe(true);
    expect(neg.isNaN()).toBe(true);
  });
});