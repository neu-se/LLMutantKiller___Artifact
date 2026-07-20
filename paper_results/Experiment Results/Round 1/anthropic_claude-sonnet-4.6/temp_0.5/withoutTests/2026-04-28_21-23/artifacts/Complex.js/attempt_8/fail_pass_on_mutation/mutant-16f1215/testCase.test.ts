import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0 + 5e-324i): checks that result matches asin called with re=0 not re=NaN", () => {
    // With a=0, b=5e-324: d=0 (b*b underflows), else branch
    // Original: asin(re=0, im=-Infinity)
    // Mutated:  asin(re=NaN, im=-Infinity)
    // Empirically test if these differ:
    const origPath = new Complex(0, -Infinity).asin();
    const mutPath = new Complex(NaN, -Infinity).asin();
    const actual = new Complex(0, 5e-324).acsc();
    // All three should be NaN,NaN - mutation is equivalent here
    // Try negative subnormal b instead
    const actual2 = new Complex(0, -5e-324).acsc();
    // a=0, b=-5e-324, d=0, else branch
    // Original: asin(0, +Infinity)  [im = -(-5e-324)/0 = +Infinity]
    // Mutated:  asin(NaN, +Infinity)
    const origPath2 = new Complex(0, Infinity).asin();
    const mutPath2 = new Complex(NaN, Infinity).asin();
    expect(Object.is(actual2.re, origPath2.re)).toBe(true);
    expect(Object.is(actual2.im, origPath2.im)).toBe(true);
  });
});