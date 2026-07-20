import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh of 2i should have re equal to logHypot not PI/2 minus atan", () => {
    const result = new Complex(0, 2).acosh();
    const acos2i = new Complex(0, 2).acos();
    
    // Original: re should be acos2i.im (the old imaginary part)
    // Mutated: re stays as acos2i.re (the old real part, not updated)
    // These two values are different, so checking re !== acos2i.re detects mutation
    expect(result.re).toBeCloseTo(acos2i.im, 10);
    expect(result.re).not.toBeCloseTo(acos2i.re, 5);
  });
});