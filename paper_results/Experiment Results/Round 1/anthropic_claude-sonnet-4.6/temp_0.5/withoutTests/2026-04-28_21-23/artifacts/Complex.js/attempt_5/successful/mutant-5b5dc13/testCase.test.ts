import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch fallback with a=0 and subnormal b: original passes 0 to asinh, mutated passes NaN", () => {
    // Force d=0 fallback: a=0, b=Number.MIN_VALUE (b*b underflows to 0)
    // Original: new Complex(0, -Infinity).asinh()  [re=0]
    // Mutated:  new Complex(NaN, -Infinity).asinh() [re=NaN]
    
    const capturedRe: number[] = [];
    const original = Complex.prototype.asinh;
    Complex.prototype.asinh = function(this: any) {
      capturedRe.push(this.re);
      return original.call(this);
    };
    
    try {
      new Complex(0, Number.MIN_VALUE).acsch();
    } finally {
      Complex.prototype.asinh = original;
    }
    
    // Original: asinh called with re=0
    // Mutated: asinh called with re=NaN
    expect(capturedRe.length).toBeGreaterThan(0);
    expect(capturedRe[0]).toBe(0); // passes on original, fails on mutated (NaN !== 0)
  });
});