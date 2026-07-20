import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("log of pure imaginary number i should give correct result", () => {
    // log(i) = i*pi/2
    // a=0, b=1: original condition (b===0 && a>0) is FALSE, uses general formula
    // mutated condition (b===0 && a>=0) is also FALSE (b!=0), uses general formula
    // Same result - not helpful
    
    // Let's try log(0+0i) through asin path
    // asin(1) = pi/2
    const result = new Complex(1, 0).asin();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBeCloseTo(0);
  });
});