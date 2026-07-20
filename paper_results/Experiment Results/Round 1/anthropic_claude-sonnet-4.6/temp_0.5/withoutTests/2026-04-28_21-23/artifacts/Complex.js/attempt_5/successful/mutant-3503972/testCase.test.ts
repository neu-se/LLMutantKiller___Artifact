import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should call asinh with negative imaginary part when b > 0 and d underflows", () => {
    const tiny = Number.MIN_VALUE;
    
    // Spy on the asinh method to capture what it's called with
    const originalAsinh = Complex.prototype.asinh;
    let capturedIm: number | undefined;
    
    Complex.prototype.asinh = function() {
      capturedIm = this.im;
      return originalAsinh.call(this);
    };
    
    try {
      new Complex(0, tiny).acsch();
      expect(capturedIm).toBe(-Infinity); // original: -b/0 = -Infinity
    } finally {
      Complex.prototype.asinh = originalAsinh;
    }
  });
});