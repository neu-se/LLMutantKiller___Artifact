import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should pass re=0 to atan when a=0 and d=0 (fallback branch)", () => {
    const tiny = Number.MIN_VALUE; // 5e-324, tiny*tiny === 0 (underflow)
    
    let capturedRe: number | undefined;
    const originalAtan = Complex.prototype['atan'];
    Complex.prototype['atan'] = function() {
      capturedRe = this['re'];
      return originalAtan.call(this);
    };
    
    try {
      new Complex(0, tiny).acot();
    } finally {
      Complex.prototype['atan'] = originalAtan;
    }
    
    // Original: re = (0 !== 0) ? 0/0 : 0 = 0
    // Mutated:  re = (0 === 0) ? 0/0 : 0 = NaN
    expect(capturedRe).toBe(0);
    expect(isNaN(capturedRe!)).toBe(false);
  });
});