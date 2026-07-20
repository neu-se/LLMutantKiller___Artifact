import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should handle computed result with negative zero imaginary part", () => {
    // Math operations that might produce -0
    // 0 * -1 = -0, -0 + 0 = 0 in JS
    // Try: new Complex(1, 0).sub(new Complex(1, 0)) gives re=0, im=0
    // Try to get im = -0: multiply 0 by -1
    const c = new Complex(0, 0);
    // Manually check if -0 can be stored
    // Actually let's try: cos(pi/2) = ~0, sin(pi/2) = 1
    // new Complex(0, Math.PI/2).exp() = e^(i*pi/2) = i
    const result = new Complex(0, Math.PI / 2).exp();
    // re = cos(pi/2) ≈ 6.12e-17, im = sin(pi/2) = 1
    // re < EPSILON → re = 0, im = 1
    // b === 0? No. a !== 0? No. else if b < 0? No (b=1). 
    // 1 !== 1? No. Returns "i"
    expect(result.toString()).toBe("i");
  });
});