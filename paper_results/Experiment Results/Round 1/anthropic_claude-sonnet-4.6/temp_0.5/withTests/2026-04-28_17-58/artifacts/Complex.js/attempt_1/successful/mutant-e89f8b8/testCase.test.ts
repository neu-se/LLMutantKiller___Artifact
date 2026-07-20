import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute the cosecant of a real number", () => {
    // csc(pi/6) = 1/sin(pi/6) = 1/0.5 = 2
    // For a real number a, csc(a) = sin(a)*cosh(0)/d - i*cos(a)*sinh(0)/d
    // where d = 0.5*cosh(0) - 0.5*cos(2/a) ... wait, there's a bug in csc formula
    // Let's use a=pi/2: csc(pi/2) = 1
    // For real input a, b=0:
    // d = 0.5*cosh(0) - 0.5*cos(2/a) = 0.5 - 0.5*cos(2/a)
    // re = sin(a)*cosh(0)/d = sin(a)/d
    // im = -cos(a)*sinh(0)/d = 0
    // With mutation: im = -cos(a)*sinh(0)*d = 0 (same for b=0)
    // Need b != 0 to distinguish
    
    // csc(1 + i) - use complex input
    const c = new Complex(1, 1);
    const result = c.csc();
    
    // Expected: sin(1)*cosh(1)/d, -cos(1)*sinh(1)/d
    // d = 0.5*cosh(2) - 0.5*cos(2/1) ... wait the formula has cos(2/a) which seems wrong
    // Let me just check that re and im are consistent with /d not *d
    // If d != 1, then /d and *d give different results
    
    // The imaginary part with /d: -cos(1)*sinh(1)/d
    // The imaginary part with *d: -cos(1)*sinh(1)*d
    // These differ when d != 1 and d != 0
    
    expect(result.re).toBeCloseTo(0.6215180171704284, 10);
    expect(result.im).toBeCloseTo(-0.30393100162842646, 10);
  });
});