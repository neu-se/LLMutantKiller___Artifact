import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0 + 5e-324i) re should equal asin(0,-Inf).re not asin(NaN,-Inf).re", () => {
    const fromZeroRe = new Complex(0, -Infinity).asin().re;
    const fromNaNRe = new Complex(NaN, -Infinity).asin().re;
    const actual = new Complex(0, 5e-324).acsc().re;
    // If fromZeroRe !== fromNaNRe, this test detects the mutation
    // If they're equal (both NaN), this test passes on both versions
    expect(Object.is(actual, fromZeroRe)).toBe(true);
  });
});