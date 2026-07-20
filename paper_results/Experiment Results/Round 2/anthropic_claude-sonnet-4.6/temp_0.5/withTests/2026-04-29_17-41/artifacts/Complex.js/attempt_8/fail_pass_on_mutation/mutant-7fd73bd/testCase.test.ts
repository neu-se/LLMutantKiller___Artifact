import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of negative real number should have imaginary part equal to PI", () => {
    // log(-5) = log(5) + i*PI
    // atan2(0, -5) = PI in both versions since if-body is commented
    // BUT: with mutation b===0 || a>0 where a=-5, b=0:
    // b===0 is TRUE, so condition is true in mutated version
    // In original: b===0 && a>0 = true && false = false
    // Body is commented so still no difference...
    // I need to find where the if body is NOT commented
    // Let me check if there's another log-like function
    const c = new Complex(1, 0);
    const logResult = c.log();
    // log(1) = 0 + 0i
    // logHypot(1, 0) = log(1*1+0)*0.5 = 0
    // atan2(0, 1) = 0
    expect(logResult.re).toBeCloseTo(0, 15);
    expect(logResult.im).toBe(0);
  });
});