import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log mutation detection", () => {
  it("log of zero real positive number vs zero should differ in imaginary part via atan2", () => {
    // The key: when a=0,b=0, original uses atan2(0,0)=0
    // but logHypot(0,0) goes through a===0 branch: Math.log(|b|) = Math.log(0) = -Infinity
    // If return is active in mutated: Math.log(0) = -Infinity, im=0
    // Try to find where atan2 gives different result
    // atan2(b=0, a=0) = 0 in both... 
    // What about negative zero? log(-0 + 0i)?
    const result = new Complex(-0, 0).log();
    // Original: -0 > 0 is false, logHypot(-0,0): b===0 returns Math.log(|-0|)=Math.log(0)=-Infinity
    // atan2(0, -0) = PI (not 0!)
    // Mutated (if return active): -0 >= 0 is true, returns Math.log(-0)=-Infinity, im=0
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});