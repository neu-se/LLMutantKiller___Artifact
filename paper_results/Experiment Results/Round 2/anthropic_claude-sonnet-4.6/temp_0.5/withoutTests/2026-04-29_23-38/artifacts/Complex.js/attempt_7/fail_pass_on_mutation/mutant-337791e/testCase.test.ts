import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp", () => {
  it("exp(1+i) should have correct real and imaginary parts", () => {
    // If the mutation changes behavior for im !== 0 case
    const c = new Complex(1, 1);
    const result = c.exp();
    
    // exp(1+i) = e*(cos(1) + i*sin(1))
    const expectedRe = Math.E * Math.cos(1);
    const expectedIm = Math.E * Math.sin(1);
    
    // In mutant, if im!==0 causes different branching that returns undefined
    // accessing .re on undefined would throw
    expect(() => {
      const r = new Complex(1, 1).exp();
      expect(r.re).toBeCloseTo(expectedRe, 10);
      expect(r.im).toBeCloseTo(expectedIm, 10);
    }).not.toThrow();
  });
});