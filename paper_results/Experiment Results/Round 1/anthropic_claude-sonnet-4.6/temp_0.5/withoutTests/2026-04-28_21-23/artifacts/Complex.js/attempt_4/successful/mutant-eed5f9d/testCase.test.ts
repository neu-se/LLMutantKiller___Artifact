import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("calls asinh with Infinity real part when a is nonzero and d underflows to zero", () => {
    const a = Number.MIN_VALUE;
    const b = -Number.MIN_VALUE;
    
    expect(a * a + b * b).toBe(0);
    
    let asinhCallRe: number | undefined;
    const originalAsinh = Complex.prototype['asinh'];
    Complex.prototype['asinh'] = function() {
      asinhCallRe = this['re'];
      return originalAsinh.call(this);
    };
    
    try {
      new Complex(a, b).acsch();
    } finally {
      Complex.prototype['asinh'] = originalAsinh;
    }
    
    // Original: asinh called with re = Infinity (a/0 where a !== 0)
    // Mutated: asinh called with re = 0 (false ? a/0 : 0)
    expect(asinhCallRe).toBe(Infinity);
  });
});