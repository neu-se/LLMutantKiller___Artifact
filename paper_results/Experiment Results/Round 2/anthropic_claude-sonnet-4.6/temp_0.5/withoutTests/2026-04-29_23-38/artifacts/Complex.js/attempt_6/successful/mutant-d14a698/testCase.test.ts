import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('passes correct sign of imaginary infinity to acos in else branch when d underflows', () => {
    const originalAcos = Complex.prototype['acos'];
    let capturedIm: number | undefined;

    Complex.prototype['acos'] = function(this: any) {
      capturedIm = this['im'];
      return originalAcos.call(this);
    };

    try {
      // Number.MIN_VALUE * Number.MIN_VALUE underflows to 0
      // so d = 0, bypassing early return (a !== 0)
      // Original: -b/0 where b = Number.MIN_VALUE > 0 → -Infinity
      // Mutated:  +b/0 where b = Number.MIN_VALUE > 0 → +Infinity
      const v = Number.MIN_VALUE;
      new Complex(v, v).asec();
      expect(capturedIm).toBe(-Infinity);
    } finally {
      Complex.prototype['acos'] = originalAcos;
    }
  });
});