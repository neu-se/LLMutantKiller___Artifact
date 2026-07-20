import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should pass Infinity (not 0) as real part to atan when d underflows to zero", () => {
    // Find a value where a^2 underflows to 0: use 1e-162
    // (1e-162)^2 = 1e-324 < Number.MIN_VALUE (~5e-324), underflows to 0
    const tiny = 1e-162;
    expect(tiny * tiny).toBe(0); // confirm underflow
    
    let capturedRe: number | undefined;
    const origAtan = Complex.prototype['atan'];
    Complex.prototype['atan'] = function(this: any) {
      capturedRe = this['re'];
      return origAtan.call(this);
    };
    
    try {
      new Complex(tiny, tiny).acot();
    } finally {
      Complex.prototype['atan'] = origAtan;
    }
    
    // Original: re = tiny/0 = Infinity
    // Mutated:  re = tiny*0 = 0
    expect(capturedRe).toBe(Infinity);
  });
});