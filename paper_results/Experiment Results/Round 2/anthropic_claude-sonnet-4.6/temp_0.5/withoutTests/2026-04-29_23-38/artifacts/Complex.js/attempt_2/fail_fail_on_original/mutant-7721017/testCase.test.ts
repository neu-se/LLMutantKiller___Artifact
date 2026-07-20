import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should correctly compute i^(1+i) with non-zero imaginary base", () => {
    // base: i (a=0, b=1), exponent: 1+i (z.re=1, z.im=1)
    // Original: condition (a===0 && b===0) is false since b=1, computes normally
    // Mutated: condition (a===0 && true && 1>0 && 1>=0) is true, returns ZERO
    const base = new Complex(0, 1); // i
    const exponent = new Complex(1, 1); // 1+i
    const result = base.pow(exponent);
    
    // i^(1+i) = exp((1+i)*log(i)) = exp((1+i)*(i*pi/2))
    // = exp(i*pi/2 - pi/2) = exp(-pi/2) * (cos(pi/2) + i*sin(pi/2))
    // = exp(-pi/2) * i ≈ 0.2079i
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});