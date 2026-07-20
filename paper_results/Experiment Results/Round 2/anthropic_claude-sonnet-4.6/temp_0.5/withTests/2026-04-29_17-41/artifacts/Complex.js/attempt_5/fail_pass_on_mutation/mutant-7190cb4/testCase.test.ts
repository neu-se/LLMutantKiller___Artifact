import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation in acsc d=0 branch with negative subnormal imaginary', () => {
    const tiny = -5e-324; // negative smallest denormalized; tiny*tiny === 0
    // a=0, b=tiny(negative): early return skipped (b !== 0), d = 0 + 0 = 0
    // original: (b!==0) ? -b/0 : 0 => -(-tiny)/0 = +Infinity => new Complex(0, +Inf).asin()
    // mutated:  (b!==0) ? +b/0 : 0 => +(-tiny)/0 = -Infinity => new Complex(0, -Inf).asin()
    // asin(0, +Inf): t1=sqrt(Inf+1,0)=(Inf,0), t2=log(Inf-Inf,0)=log(NaN,0)=NaN => NaN
    // asin(0, -Inf): t1=sqrt(Inf+1,0)=(Inf,0), t2=log(Inf+Inf,0)=log(Inf,0)=(Inf,0) => (0,-Inf)
    const result = new Complex(0, tiny).acsc();
    // Original should give NaN (asin of 0,+Inf)
    // Mutated should give (0,-Inf) (asin of 0,-Inf)
    expect(result.isNaN()).toBe(true);
  });
});