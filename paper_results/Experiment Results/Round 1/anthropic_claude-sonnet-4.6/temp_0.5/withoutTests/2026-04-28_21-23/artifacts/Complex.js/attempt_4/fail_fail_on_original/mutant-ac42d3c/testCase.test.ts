import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan for purely imaginary input with b < -1", () => {
  it("should correctly compute atan for Complex(0, -2)", () => {
    // For Complex(0, -2): a=0, b=-2
    // b !== 1, b !== -1, so both original and mutated proceed the same
    // d = 0 + (1-(-2))^2 = 9
    // t1 = log(Complex((1-4-0)/9, 0)) = log(Complex(-1/3, 0))
    // logHypot(-1/3, 0): b===0 returns log(1/3) = -log(3)
    // atan2(0, -1/3) = pi
    // t1 = Complex(-log(3), pi)
    // result = Complex(-0.5*pi, 0.5*(-log(3))) = Complex(-pi/2, -log(3)/2)
    const c = new Complex(0, -2);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
  });
});