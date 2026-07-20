import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("detects mutation in acsch d=0 fallback via spy on asinh", () => {
    const tiny = 5e-324;
    
    let capturedRe: number | undefined;
    const originalAsinh = (Complex.prototype as any)['asinh'];
    
    // Replace asinh with a wrapper that captures 'this.re' then calls original
    (Complex.prototype as any)['asinh'] = function(this: any) {
      capturedRe = this['re'];
      // Temporarily restore original to avoid recursion
      (Complex.prototype as any)['asinh'] = originalAsinh;
      const result = originalAsinh.call(this);
      // Re-install wrapper for subsequent calls
      (Complex.prototype as any)['asinh'] = arguments.callee;
      return result;
    };
    
    try {
      new Complex(0, tiny).acsch();
    } finally {
      (Complex.prototype as any)['asinh'] = originalAsinh;
    }
    
    // Original: (0 !== 0) ? 0/0 : 0 = 0
    // Mutated:  (0 === 0) ? 0/0 : 0 = NaN
    expect(Number.isNaN(capturedRe)).toBe(false);
  });
});