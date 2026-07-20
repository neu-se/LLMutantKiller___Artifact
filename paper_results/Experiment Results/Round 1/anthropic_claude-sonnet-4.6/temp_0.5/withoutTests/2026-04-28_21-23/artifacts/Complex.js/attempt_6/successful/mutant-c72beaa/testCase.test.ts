import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('should use division by zero (not multiplication) when computing acot with underflowed d', () => {
    const tiny = Number.MIN_VALUE;
    // In IEEE 754, tiny*tiny underflows to 0, so d = tiny^2 + tiny^2 = 0
    // This reaches the d===0 branch in acot
    // Original: new Complex(a/0, -b/0).atan() where a=tiny>0, b=tiny>0
    //   => new Complex(Infinity, -Infinity).atan()
    // Mutated: new Complex(a*0, -b/0).atan()
    //   => new Complex(0, -Infinity).atan()
    
    let atanRe: number = -1;
    const origAtan = Complex.prototype['atan'];
    Complex.prototype['atan'] = function(this: any) {
      atanRe = this['re'];
      return origAtan.call(this);
    };
    
    new Complex(tiny, tiny).acot();
    Complex.prototype['atan'] = origAtan;
    
    // Original: Infinity; Mutated: 0 (if d=0 branch reached)
    // Or if normal branch: tiny/d = Infinity (same for both)
    // The key: if d=0 is reached, mutated gives 0, not Infinity
    expect(atanRe).toBe(Infinity);
  });
});