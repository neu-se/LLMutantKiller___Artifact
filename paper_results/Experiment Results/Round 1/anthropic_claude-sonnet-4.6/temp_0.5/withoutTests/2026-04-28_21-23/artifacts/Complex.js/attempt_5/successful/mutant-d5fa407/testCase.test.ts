import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot with subnormal imaginary", () => {
  it("acot(0 + MIN_VALUE*i) should differ from acot(0+0i) due to underflow in d", () => {
    const tiny = Number.MIN_VALUE;
    // d = tiny*tiny underflows to 0, triggering the else branch
    // Original uses (b !== 0) ? -b/0 : 0 = -Infinity for im
    // Mutated uses (false) ? ... : 0 = 0 for im
    const result = new Complex(0, tiny).acot();
    // new Complex(0, -Infinity).atan() should give re = -pi/4 or similar
    // new Complex(0, 0).atan() gives re = 0
    expect(isFinite(result.re) && result.re !== 0 || !isFinite(result.im)).toBe(true);
  });
});