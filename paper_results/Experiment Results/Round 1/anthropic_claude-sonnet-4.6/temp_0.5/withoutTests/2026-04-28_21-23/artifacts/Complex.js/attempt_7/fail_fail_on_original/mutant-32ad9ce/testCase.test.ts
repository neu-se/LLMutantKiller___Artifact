import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mutation detection via logHypot", () => {
  it("should correctly compute log of a complex number near zero", () => {
    // log(0 + 0i) should produce a complex with re=-Infinity, im=0
    // logHypot(0,0): a===0 returns Math.log(0) = -Infinity
    // So re = -Infinity, im = atan2(0,0) = 0
    // Neither is NaN, so mutation doesn't affect this
    
    // Let's try log of negative real: log(-1) = i*pi
    // re = logHypot(-1, 0) = log(1) = 0, im = atan2(0,-1) = pi
    const result = new Complex(-1, 0).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
    
    // Now try something that produces NaN in only one component internally
    // pow(0, complex with negative real) 
    // 0^(-1+0i): a=0,b=0, z.re=-1 < 0, so doesn't hit the ZERO shortcut
    // loh = logHypot(0,0) = -Infinity
    // arg = atan2(0,0) = 0
    // exp(-1 * -Infinity - 0) = exp(Infinity) = Infinity
    // b = 0*(-Infinity) + (-1)*0 = NaN + 0 = NaN
    const pow_result = new Complex(0, 0).pow(new Complex(-1, 0));
    expect(pow_result.isNaN()).toBe(true);
  });
});