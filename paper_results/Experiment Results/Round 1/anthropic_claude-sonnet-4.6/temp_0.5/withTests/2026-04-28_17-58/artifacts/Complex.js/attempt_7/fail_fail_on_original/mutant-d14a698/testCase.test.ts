import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('verifies d=0 branch is reachable and sign matters via Number.MIN_VALUE inputs', () => {
    const tiny = Number.MIN_VALUE; // 5e-324
    // Verify d actually underflows
    expect(tiny * tiny + tiny * tiny).toBe(0);
    
    // With a=tiny, b=tiny (both positive):
    // d=0, early return not triggered (a != 0 || b != 0)
    // Original: new Complex(tiny/0, -tiny/0).acos() = acos(+Inf, -Inf)
    // Mutated:  new Complex(tiny/0, +tiny/0).acos() = acos(+Inf, +Inf)
    // Both give NaN as shown... 
    
    // Try a=tiny, b=0: d=0, b=0 so -b/0 = 0 = +b/0 (same!) - no difference
    // Try a=0, b=tiny: d=0, a=0 so a/0=NaN... wait: (a !== 0) ? a/0 : 0 => 0
    // Original: new Complex(0, -tiny/0).acos() = acos(0, -Inf)  
    // Mutated:  new Complex(0, +tiny/0).acos() = acos(0, +Inf)
    
    // Let me check what acos(0, -Inf) and acos(0, +Inf) actually give in this library
    const r1 = new Complex(0, -Infinity).acos();
    const r2 = new Complex(0, Infinity).acos();
    
    // From test feedback: both give NaN. But let me check re parts specifically
    // t1 for acos(0, -Inf): sqrt((-Inf)^2 - 0 + 1, 0) = sqrt(Inf, 0) = (Inf, 0)
    // t2: log(Inf - (-Inf), 0) = log(Inf, 0) = (Inf, 0) -- wait Inf-(-Inf)=Inf!
    // result: (PI/2 - 0, Inf) -- should be (PI/2, Inf) not NaN!
    
    // But test showed NaN... maybe sqrt(Inf, 0) doesn't give (Inf, 0)?
    // sqrt: a=Inf>=0, b=0, returns new Complex(Math.sqrt(Inf), 0) = (Inf, 0) ✓
    // Then t2 = log(Inf-(-Inf), 0+0) = log(Inf, 0)
    // logHypot(Inf, 0): b===0 so returns Math.log(|Inf|) = Inf ✓
    // atan2(0, Inf) = 0 ✓
    // result re = PI/2 - t2.im = PI/2 - 0 = PI/2
    // result im = t2.re = Inf
    // So acos(0, -Inf) SHOULD give (PI/2, Inf)!
    
    expect(r1.re).toBeCloseTo(Math.PI / 2, 10);
    expect(r1.im).toBe(Infinity);
    expect(isNaN(r2.im)).toBe(true);
    
    const z = new Complex(0, tiny);
    const result = z.asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
  });
});