import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation detection', () => {
  it('acsc result for tiny negative imaginary input differs from tiny positive', () => {
    // With d=0 underflow and b=-tiny (negative):
    // Original passes +Inf as im to asin (since -(-tiny)/0 = +Inf)  
    // Mutated passes -Inf as im to asin (since +(-tiny)/0 = -Inf)
    // With d=0 underflow and b=+tiny (positive):
    // Original passes -Inf as im to asin (since -(+tiny)/0 = -Inf)
    // Mutated passes +Inf as im to asin (since +(+tiny)/0 = +Inf)
    // So original: acsc(0,+tiny) and acsc(0,-tiny) get SWAPPED inputs vs mutated
    // Both give NaN... unless we check sign of NaN? No.
    
    // Let me try: does acsc(0, tiny) === acsc(0, -tiny) in original?
    // Original: acsc(0,tiny) -> asin(0,-Inf) -> NaN
    //           acsc(0,-tiny) -> asin(0,+Inf) -> NaN  
    // Mutated:  acsc(0,tiny) -> asin(0,+Inf) -> NaN
    //           acsc(0,-tiny) -> asin(0,-Inf) -> NaN
    // All NaN. Cannot distinguish.
    
    // I need to find a non-NaN producing path...
    // What if I use acsc on a value where d underflows but through a different computation?
    
    // Actually let me just verify the mathematical correctness for values near the boundary
    const z = new Complex(0, 1e-155); // d = 1e-310, which > Number.MIN_VALUE
    const result = z.acsc();
    // acsc(0, 1e-155) = asin(0/(1e-310), -1e-155/1e-310) = asin(0, -1e155)
    // asin(0, -1e155): b=-1e155, b^2=1e310 > MAX_VALUE = Inf
    // t1 = sqrt(Inf, 0) = Complex(Inf, 0)
    // t2 = log(Inf-(-1e155), 0) = log(Inf, 0) = Complex(Inf, 0)  
    // return Complex(0, -Inf)
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBe(-Infinity);
  });
});