import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech fallback branch", () => {
  it("asech with extremely small non-zero real part produces different im result in original vs mutated", () => {
    // With tiny value, d underflows to 0, triggering fallback branch
    // Original: (a !== 0) ? a/0 : 0  => re = Infinity, im = 0 => acosh(Infinity, 0)
    // Mutated:  (a === 0) ? a/0 : 0  => re = 0, im = 0 => acosh(0, 0)
    const tiny = 5e-324;
    const c = new Complex(tiny, 0);
    const result = c.asech();
    // acosh(0, 0): acos(0,0) => t1 = sqrt(1,0) = (1,0), t2 = log(1,0) = (0,0)
    // => acos returns (pi/2 - 0, 0) = (pi/2, 0)
    // acosh: im=0 <= 0, so re=-im=0, im=re=pi/2 => (0, pi/2)
    // acosh(Infinity, 0): leads to NaN
    // So original gives NaN, mutated gives (0, pi/2)
    // We want original to pass: check that im is NaN
    expect(isNaN(result.im) || isNaN(result.re)).toBe(true);
  });
});