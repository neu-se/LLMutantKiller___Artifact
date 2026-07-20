import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should compute the real part of csch correctly using division not multiplication", () => {
    // csch(z) real part = -2 * sinh(a) * Math.cos(b) / d
    // where d = Math.cos(2*b) - cosh(2/a) ... wait, let me re-read
    // Actually from the code:
    // d = Math.cos(2 * b) - cosh(2 / a)  <-- note: this looks like a bug in original but let's test the mutation
    // re = -2 * sinh(a) * Math.cos(b) / d  (original)
    // re = -2 * sinh(a) * Math.cos(b) * d  (mutated)
    
    // Let's use a simple real input: z = 1 + 0i
    // csch(1) = 1/sinh(1) = 2/(e - 1/e) ≈ 0.8509181282...
    
    const z = new Complex(1, 0);
    const result = z.csch();
    
    // Expected: csch(1) ≈ 0.8509181282393216
    const expected = 1 / Math.sinh(1);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});