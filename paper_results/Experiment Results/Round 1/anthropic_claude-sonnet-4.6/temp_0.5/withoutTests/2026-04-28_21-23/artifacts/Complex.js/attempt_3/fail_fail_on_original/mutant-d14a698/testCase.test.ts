import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec of a complex number with small negative imaginary part near underflow boundary', () => {
    // Force d=0 with b negative: b=-5e-324, a=0
    // Original: -b/0 = 5e-324/0 = Infinity -> Complex(0, Infinity).acos()
    // Mutated:  +b/0 = -5e-324/0 = -Infinity -> Complex(0, -Infinity).acos()
    // acos(0, Infinity): a=0, b=Inf
    // t1 = sqrt(Inf-0+1, 0) = sqrt(Inf, 0) = (Inf, 0)
    // t2 = log(Inf-Inf, 0+0) = log(NaN, 0) -> NaN result
    // Both give NaN... need different approach
    
    // Let me try: what if we use a value where d rounds to 0 but is actually nonzero
    // and the acos gives a finite result?
    // Complex(0, -Infinity).acos(): b=-Inf
    // t1 = sqrt(Inf+1, 0) = (Inf, 0)  
    // t2 = log(Inf-(-Inf), 0) = log(Inf+Inf, 0) = log(Inf, 0) = (Inf, 0)
    // acos = (PI/2 - 0, Inf) -> re=PI/2, im=Inf
    
    // Complex(0, +Infinity).acos(): b=+Inf
    // t1 = sqrt(Inf+1, 0) = (Inf, 0)
    // t2 = log(Inf-(+Inf), 0) = log(0, 0) -> log(0) = -Inf
    // acos = (PI/2 - 0, -Inf) -> re=PI/2, im=-Inf
    
    // So original (b=-tiny): Complex(0, +Inf).acos() -> im = -Inf
    // Mutated (b=-tiny):     Complex(0, -Inf).acos() -> im = +Inf
    
    const result = new Complex(0, -Number.MIN_VALUE).asec();
    expect(result.im).toBe(-Infinity);
  });
});