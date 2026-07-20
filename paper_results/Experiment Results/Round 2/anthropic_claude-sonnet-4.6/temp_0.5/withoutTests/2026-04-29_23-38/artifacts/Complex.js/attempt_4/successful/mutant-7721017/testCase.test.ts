import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should correctly compute (i)^(2+i) with non-zero result", () => {
    // base: i (a=0, b=1), exponent: 2+i (z.re=2, z.im=1)
    // z['im'] !== 0, so skips the real-exponent branch entirely
    // Original: (a===0 && b===0) is false since b=1, computes normally
    // Mutated: (a===0 && true && 2>0 && 1>=0) is true, returns ZERO
    // i^(2+i) = exp((2+i)*log(i)) = exp((2+i)*(i*pi/2))
    // = exp(2i*pi/2 + i^2*pi/2) = exp(i*pi - pi/2)
    // = exp(-pi/2) * (cos(pi) + i*sin(pi)) = exp(-pi/2) * (-1 + 0i)
    // re ≈ -0.2079, im ≈ 0
    const base = new Complex(0, 1); // i
    const result = base.pow(new Complex(2, 1));
    
    expect(result.re).toBeCloseTo(-Math.exp(-Math.PI / 2), 10);
  });
});