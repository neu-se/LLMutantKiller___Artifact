import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should call acos with negative imaginary part for Number.MIN_VALUE imaginary input', () => {
    const originalAcos = Complex.prototype['acos'];
    let capturedIm: number | undefined;
    
    Complex.prototype['acos'] = function() {
      capturedIm = this['im'];
      return originalAcos.call(this);
    };
    
    try {
      // Number.MIN_VALUE * Number.MIN_VALUE definitely underflows to 0
      // so d = 0, and b = Number.MIN_VALUE != 0
      // Original: capturedIm = -Number.MIN_VALUE/0 = -Infinity
      // Mutated:  capturedIm = +Number.MIN_VALUE/0 = +Infinity
      new Complex(0, Number.MIN_VALUE).asec();
      expect(capturedIm).toBe(-Infinity);
    } finally {
      Complex.prototype['acos'] = originalAcos;
    }
  });
});