import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should correctly compute (i)^(1+i) which is not zero", () => {
    // (0+i)^(1+i): a=0, b=1, z.re=1>0, z.im=1>=0
    // Original: b !== 0, condition false, computes via exp/log
    // Mutated: returns ZERO incorrectly
    const result = new Complex(0, 1).pow(new Complex(1, 1));
    
    // i^(1+i) = exp((1+i)*log(i)) = exp((1+i)*(i*pi/2))
    // = exp(i*pi/2 - pi/2) = exp(-pi/2) * (cos(pi/2) + i*sin(pi/2))
    // ≈ exp(-pi/2) * i ≈ 0.2079 * i
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.exp(-Math.PI / 2), 10);
  });
});