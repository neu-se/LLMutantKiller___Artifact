import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("detects mutation in acsch d=0 fallback", () => {
    const tiny = 5e-324;
    let capturedRe: number = -999;
    const originalAsinh = (Complex.prototype as any)['asinh'];
    
    (Complex.prototype as any)['asinh'] = function(this: any) {
      capturedRe = this['re'];
      (Complex.prototype as any)['asinh'] = originalAsinh;
      return originalAsinh.call(this);
    };
    
    new Complex(0, tiny).acsch();
    (Complex.prototype as any)['asinh'] = originalAsinh;
    
    expect(Number.isNaN(capturedRe)).toBe(false);
  });
});