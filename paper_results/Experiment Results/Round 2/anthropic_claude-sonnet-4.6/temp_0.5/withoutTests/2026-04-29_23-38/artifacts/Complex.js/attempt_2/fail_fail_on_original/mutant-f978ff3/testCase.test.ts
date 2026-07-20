import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute the real part of csch(1+i) matching the imaginary part ratio", () => {
    // csch(c) = 2 / (e^c - e^-c)
    // The real part uses: -2 * sinh(a) * sin(b) / d
    // The mutation changes / d to * d in the real part
    // We can detect this by checking that re/im equals sinh(a)/cosh(a) = tanh(a)
    // since re = -2*sinh(a)*sin(b)/d and im = 2*cosh(a)*sin(b)/d
    // so re/im = -sinh(a)/cosh(a) = -tanh(a)
    
    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.csch();
    
    // In the original: re/im = -sinh(1)/cosh(1) = -tanh(1)
    // In the mutated: re = -2*sinh(a)*sin(b)*d, im = 2*cosh(a)*sin(b)/d
    // so re/im = -sinh(a)*d^2/cosh(a) which is different
    
    const expectedRatio = -Math.sinh(a) / Math.cosh(a); // = -tanh(1)
    const actualRatio = result.re / result.im;
    
    expect(actualRatio).toBeCloseTo(expectedRatio, 10);
  });
});