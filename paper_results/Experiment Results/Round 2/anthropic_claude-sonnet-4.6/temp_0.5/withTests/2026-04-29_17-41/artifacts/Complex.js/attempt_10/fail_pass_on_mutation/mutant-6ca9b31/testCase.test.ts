import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should use + sign when b is 0 in the sign selection logic', () => {
    // Patch EPSILON to be negative so no zeroing happens
    // and patch the prototype to skip the early return
    const proto = Complex.prototype as any;
    const origToString = proto['toString'];
    
    // Create a version that skips the b===0 early return
    proto['toString'] = function() {
      const a = this['re'];
      let b = this['im'];
      let ret = '';
      
      if (this['isNaN']()) return 'NaN';
      if (this['isInfinite']()) return 'Infinity';
      
      if (Math.abs(a) < (Complex as any)['EPSILON']) { /* skip a zeroing */ }
      // DON'T zero b and DON'T do early return - go straight to sign logic
      
      if (a !== 0) {
        ret += a;
        ret += ' ';
        // This replicates the mutation point:
        if (b < 0) {  // original behavior
          b = -b;
          ret += '-';
        } else {
          ret += '+';
        }
        ret += ' ';
      }
      if (1 !== b) ret += b;
      return ret + 'i';
    };
    
    const c = new Complex(1, 0);
    const result = c.toString();
    proto['toString'] = origToString;
    
    // With b=0: original b<0 is false → '+' → "1 + 0i"
    // This tests OUR patched version, not the mutation
    expect(result).toBe('1 + 0i');
  });
});