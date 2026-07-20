import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should pass correct sign to atan in d=0 branch", () => {
    const originalAtan = Complex.prototype.atan;
    let capturedIm: number | undefined;
    
    Complex.prototype.atan = function() {
      capturedIm = this.im;
      return originalAtan.call(this);
    };
    
    try {
      const tiny = Number.MIN_VALUE; // squared underflows to 0
      new Complex(0, tiny).acot();
      // Original: imaginary passed to atan should be -Infinity (negative)
      // Mutated: imaginary passed to atan should be +Infinity (positive)
      expect(capturedIm).toBe(-Infinity);
    } finally {
      Complex.prototype.atan = originalAtan;
    }
  });
});