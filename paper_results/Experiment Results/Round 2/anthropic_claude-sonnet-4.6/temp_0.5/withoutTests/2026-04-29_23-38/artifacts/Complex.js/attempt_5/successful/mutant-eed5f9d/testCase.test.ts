import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("passes Infinity as real part to asinh when a is nonzero and d underflows to zero", () => {
    // 5e-200 * 5e-200 underflows to 0 in IEEE 754, but 5e-200 !== 0
    // Original: new Complex(5e-200/0, ...) = new Complex(Infinity, ...) passed to asinh
    // Mutant:   new Complex(0, ...) passed to asinh (always 0 due to (false) ? ... : 0)
    
    const capturedRe: number[] = [];
    const proto = Complex.prototype as any;
    const originalAsinh = proto['asinh'];
    
    proto['asinh'] = function(this: any): any {
      capturedRe.push(this['re']);
      return originalAsinh.call(this);
    };
    
    try {
      new Complex(5e-200, 5e-200).acsch();
    } finally {
      proto['asinh'] = originalAsinh;
    }
    
    // Original code: a/0 = Infinity when a !== 0
    // Mutant code: always 0
    expect(capturedRe[0]).toBe(Infinity);
  });
});