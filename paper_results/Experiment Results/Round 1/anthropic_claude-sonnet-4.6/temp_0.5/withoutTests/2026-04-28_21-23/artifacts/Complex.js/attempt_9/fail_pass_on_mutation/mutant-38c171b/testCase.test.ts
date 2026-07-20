import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with specific tiny input gives expected result", () => {
    const tiny = Math.pow(2, -538);
    const result = new Complex(tiny, tiny).acsch();
    // In original: d=0, gives new Complex(0, -Infinity).asinh() 
    // In mutated: d=0, gives new Complex(0, 0).asinh() = {re:0, im:0}
    // Check that result is not {re:0, im:0}
    const isZeroResult = result.re === 0 && result.im === 0;
    expect(isZeroResult).toBe(false);
  });
});