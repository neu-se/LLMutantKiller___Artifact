import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth with subnormal b where b*b underflows to 0 calls atanh with negative imaginary part', () => {
    // When b = Number.MIN_VALUE (5e-324), b*b underflows to 0 in IEEE 754
    // So d = a*a + b*b = 0 + 0 = 0, hitting the d===0 branch
    // Original: new Complex(0, -b/0).atanh() => atanh called with im = -Infinity
    // Mutated:  new Complex(0, +b/0).atanh() => atanh called with im = +Infinity
    const b = Number.MIN_VALUE; // 5e-324

    const originalAtanh = Complex.prototype['atanh'];
    let capturedIm: number | undefined;

    Complex.prototype['atanh'] = function(this: any): any {
      capturedIm = this['im'];
      return originalAtanh.call(this);
    };

    try {
      new Complex(0, b).acoth();
    } finally {
      Complex.prototype['atanh'] = originalAtanh;
    }

    // Original code: -b/0 = -(5e-324)/0 = -Infinity
    // Mutated code:  +b/0 = +(5e-324)/0 = +Infinity
    expect(capturedIm).toBe(-Infinity);
  });
});