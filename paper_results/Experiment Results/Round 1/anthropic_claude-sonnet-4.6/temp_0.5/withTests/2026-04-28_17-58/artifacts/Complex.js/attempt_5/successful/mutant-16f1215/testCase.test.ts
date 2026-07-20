import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsc mutation detection', () => {
  it('acsc with zero real and subnormal imaginary should pass re=0 (not NaN) to asin', () => {
    const originalAsin = Complex.prototype['asin'];
    let capturedRe: number | undefined;

    Complex.prototype['asin'] = function(this: any) {
      capturedRe = this['re'];
      return originalAsin.call(this);
    };

    try {
      new Complex(0, Number.MIN_VALUE).acsc();
    } finally {
      Complex.prototype['asin'] = originalAsin;
    }

    // Original: (a !== 0) ? a/0 : 0 → re = 0 when a=0
    // Mutant:   (true)    ? a/0 : 0 → re = NaN (0/0) when a=0
    expect(isNaN(capturedRe as number)).toBe(false);
  });
});