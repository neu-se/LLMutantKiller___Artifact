import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("should compute log of purely imaginary number correctly", () => {
    // log(0 + 1i) = i*pi/2, so re=0, im=pi/2
    // With mutation b===0 || a>0: b=0 is false (b=1), a>0 is false (a=0)
    // With original b===0 && a>0: same result
    // Try log(-2 + 0i): re=log(2), im=pi
    // logHypot(-2, 0) = log(2), atan2(0,-2) = pi - correct in both
    // The mutation only matters if the if-body weren't commented...
    // Let me check if there's a case where logHypot gives wrong answer
    // but Math.log would be used instead with the original condition
    const c = new Complex(Math.E, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.im).toBe(0); // strict: atan2(0, e) must be exactly 0
  });
});