import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("should correctly compute acsch for subnormal inputs where d underflows to zero", () => {
    const tiny = 5e-324; // smallest positive subnormal - tiny*tiny === 0
    // Verify our assumption
    expect(tiny * tiny).toBe(0);
    expect(tiny).not.toBe(0);
    
    // b = tiny !== 0, so early return skipped
    // d = tiny*tiny + tiny*tiny = 0, so d===0 branch hit
    // second arg: (b !== 0) ? -b/0 : 0 = -Infinity (same in both)
    // first arg original:  (a !== 0) ? a/0 : 0 = Infinity
    // first arg mutated:   (a === 0) ? a/0 : 0 = 0
    // original:  Complex(Infinity, -Infinity).asinh()
    // mutated:   Complex(0, -Infinity).asinh()
    const result = new Complex(tiny, tiny).acsch();
    const originalExpected = new Complex(Infinity, -Infinity).asinh();
    const mutatedExpected = new Complex(0, -Infinity).asinh();
    
    // These should differ
    expect(result.re).toBeCloseTo(originalExpected.re, 5);
    expect(result.im).toBeCloseTo(originalExpected.im, 5);
    expect(result.re).not.toBeCloseTo(mutatedExpected.re, 5);
  });
});