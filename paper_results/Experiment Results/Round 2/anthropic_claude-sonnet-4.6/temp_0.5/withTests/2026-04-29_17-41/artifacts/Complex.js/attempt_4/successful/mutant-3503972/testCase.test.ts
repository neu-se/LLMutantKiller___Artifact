import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should call asinh with negative imaginary part when d=0 and b>0", () => {
    const originalAsinh = Complex.prototype.asinh;
    let capturedIm: number | undefined;
    
    Complex.prototype.asinh = function() {
      capturedIm = this.im;
      return originalAsinh.call(this);
    };
    
    try {
      const b = Number.MIN_VALUE;
      new Complex(0, b).acsch();
      
      // Original: im = -b/0 = -Infinity (b > 0)
      // Mutated:  im = +b/0 = +Infinity (b > 0)
      expect(capturedIm).toBe(-Infinity);
    } finally {
      Complex.prototype.asinh = originalAsinh;
    }
  });
});