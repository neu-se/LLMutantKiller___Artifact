import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('detects mutation in asec when real part is zero', () => {
    // For z = 0 + 1i: a=0, b=1
    // Original else branch: new Complex(0, -Infinity).acos()
    // In acos with (a=0, b=-Inf):
    //   t1 = sqrt(Inf+1, 0) = (Inf, 0)
    //   t2 = log(Inf - (-Inf), 0 + 0) = log(NaN, 0) -> NaN
    // Mutated else branch: new Complex(NaN, -Infinity).acos()
    // In acos with (a=NaN, b=-Inf):
    //   t1 = sqrt(Inf - NaN + 1, 0) = sqrt(NaN, 0) -> NaN
    // Both give NaN...
    
    // Let me try z = 0 - 2i: a=0, b=-2
    // Original: new Complex(0, 2/0=Inf).acos() = new Complex(0, Inf).acos()
    // In acos(a=0, b=Inf):
    //   t1 = sqrt(Inf - 0 + 1, 0) = sqrt(Inf, 0) = (Inf, 0)
    //   t2 = log(Inf - Inf, 0 + 0) = log(0, 0) -> log(0) = -Inf
    //   return (pi/2 - 0, -Inf) = (pi/2, -Inf)
    // Mutated: new Complex(NaN, Inf).acos()
    // In acos(a=NaN, b=Inf):
    //   t1 = sqrt(Inf - NaN + 1, -2*NaN*Inf).sqrt() -> NaN
    // Result is NaN!
    const result = new Complex(0, -2).asec();
    expect(isNaN(result.re)).toBe(false);
  });
});