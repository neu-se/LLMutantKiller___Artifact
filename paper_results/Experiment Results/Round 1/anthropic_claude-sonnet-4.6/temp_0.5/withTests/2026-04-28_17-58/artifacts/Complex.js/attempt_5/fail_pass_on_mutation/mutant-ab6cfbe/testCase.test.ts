import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of negative real number should have imaginary part PI", () => {
    // log(-1) = 0 + i*PI, this uses the general formula path
    // With mutation a>=0 includes 0, but -1 < 0 so same path
    // Test log(0+0i) through pow: (0+0i)^2
    const c = new Complex(0, 0);
    const logResult = c.log();
    // logHypot(0,0): a===0 returns Math.log(0) = -Infinity
    // atan2(0,0) = 0
    // Both versions should give same... 
    // Try a different approach: test that log(-1) gives correct PI imaginary
    const result = new Complex(-1, 0).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});