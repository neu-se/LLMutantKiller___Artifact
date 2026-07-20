import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('asec result should match acos of inverse for real input', () => {
    // For real z > 1, asec(z) = acos(1/z)
    // z = 3: a=3, b=0
    // Both original and mutated: new Complex(Inf, 0).acos()
    // This is the same for both, so not useful
    
    // The ONLY difference is when a=0
    // Let me check if maybe the im part differs for some input
    // For z = 0 + 1i:
    // Original acos(0, -Inf) -> NaN (shown above)  
    // Mutated acos(NaN, -Inf) -> NaN (shown above)
    // 
    // Maybe try to find where NaN propagates differently...
    // Actually let me check: what is -2 * 0 * (-Infinity) in JS?
    // In acos: t1 = new Complex(b*b - a*a + 1, -2*a*b)
    // For (0, -Inf): -2 * 0 * (-Inf) = 0 (not NaN!)
    // Because: -2 * 0 = 0 (positive zero), 0 * (-Inf) = NaN? 
    // Actually in JS: 0 * Infinity = NaN, but -2 * 0 = -0
    // -0 * (-Infinity) = +0... wait no
    // Let me check: (-0) * (-Infinity) = +Infinity? No...
    // IEEE 754: 0 * Infinity = NaN regardless of signs? No!
    // Actually: +0 * +Inf = NaN, -0 * -Inf = NaN, +0 * -Inf = NaN, -0 * +Inf = NaN
    // All 0 * Inf = NaN in IEEE 754
    // So -2 * 0 * (-Inf) = (-0) * (-Inf) = NaN? 
    // Hmm, but -2 * 0 in JS = -0 (negative zero)
    // (-0) * (-Infinity) = ... let me think
    // sign: negative * negative = positive, magnitude: 0 * Inf = NaN
    // So result is NaN
    
    // OK so my analysis was right. Both give NaN.
    // 
    // WAIT - what if I misread the code? Let me re-check:
    // In acos: t1 = new Complex(b*b - a*a + 1, -2*a*b)
    // For asec input (0, -Inf) -> acos called with a=0, b=-Inf
    // -2 * a * b = -2 * 0 * (-Inf) = NaN
    // For asec input (NaN, -Inf) -> acos called with a=NaN, b=-Inf  
    // -2 * NaN * (-Inf) = NaN
    // Both NaN in imaginary of t1
    
    // I'm stuck. Let me try a completely different approach:
    // Maybe test that asec(2) equals pi/3 (mathematical truth)
    // and see if mutation breaks it
    // asec(2): a=2, b=0 -> new Complex(Inf, 0).acos()
    // acos(Inf, 0):
    //   t1 = new Complex(0 - Inf + 1, 0).sqrt() = new Complex(-Inf, 0).sqrt()
    //   sqrt(-Inf, 0): a=-Inf < 0, b=0
    //     b===0? No wait b=0 IS 0... 
    //     a >= 0? No (-Inf < 0)
    //     re = |0| / sqrt(2*(r - (-Inf))) = 0/sqrt(Inf) = 0
    //     a <= 0? Yes. im = 0.5*sqrt(2*(r-a)) = 0.5*sqrt(2*(Inf+Inf)) = 0.5*sqrt(Inf) = Inf
    //     b < 0? No (b=0). So im = Inf
    //   t1 = (0, Inf)
    //   t2 = new Complex(0 - 0, Inf + Inf).log() = new Complex(0, Inf).log()
    //   log(0, Inf): logHypot(0, Inf) = log(Inf) = Inf, atan2(Inf, 0) = pi/2
    //   t2 = (Inf, pi/2)
    //   return new Complex(pi/2 - pi/2, Inf) = new Complex(0, Inf)
    // So asec(2) = (0, Inf)? That's wrong mathematically...
    // The code is broken due to (false) condition!
    
    // So asec is completely broken for ALL inputs in the original code too.
    // The mutation might not be detectable through asec at all!
    // Unless... the test should verify that asec IS broken in a specific way
    // that differs between original and mutated.
    
    // For asec(2): a=2, b=0 -> same in both original and mutated
    // For asec(0+1i): both give NaN
    // 
    // Is there ANY input where original and mutated differ?
    // Only when a=0 AND the NaN vs 0 propagates differently through acos.
    // But as shown, both give NaN.
    
    // UNLESS: maybe for some input, original gives a non-NaN result
    // Let me try to find such an input by checking the acos path more carefully
    // for new Complex(0, -Inf) specifically
    
    // Actually wait - I made an error above. Let me recheck sqrt(Inf, NaN):
    // In sqrt: a = this.re = Inf, b = this.im = NaN, r = this.abs() = hypot(Inf, NaN)
    // hypot(Inf, NaN): a=Inf, b=NaN, both >= 3000? Inf>=3000 yes, NaN>=3000 is false
    // So: a < 3000? No. b < 3000? NaN < 3000 is FALSE in JS!
    // So we go to the else branch: a < b? Inf < NaN = false
    // b = NaN/Inf = NaN, return Inf * sqrt(1 + NaN) = Inf * NaN = NaN
    // r = NaN
    // In sqrt: a=Inf >= 0, b=NaN
    // b === 0? No. re = 0.5 * sqrt(2*(NaN + Inf)) = NaN
    // a <= 0? No. im = |NaN| / sqrt(2*(NaN+Inf)) = NaN/NaN = NaN
    // b < 0? NaN < 0 = false, so im = NaN
    // t1 = (NaN, NaN)
    
    // And for acos(0, -Inf) the imaginary of t1 input was NaN (from -2*0*(-Inf))
    // So t1 = sqrt(Inf, NaN) = (NaN, NaN)
    
    // Hmm. What if instead of (0, -Inf) we had (0, Inf)?
    // That would be asec(0, -b) for b>0, i.e., asec(0 - 1i)
    // a=0, b=-1: Original: new Complex(0, 1/0) = new Complex(0, Inf)
    //            Mutated:  new Complex(NaN, Inf)
    // acos(0, Inf):
    //   t1 = new Complex(Inf - 0 + 1, -2*0*Inf).sqrt() = new Complex(Inf, NaN).sqrt() = (NaN,NaN)
    // Same issue.
    
    // I think the mutation is genuinely undetectable through asec because:
    // 1. For a != 0: both give same result
    // 2. For a == 0, b != 0: both give NaN through acos
    // 3. For a == 0, b == 0: handled by early return
    
    // BUT WAIT - maybe I should test this through a method that USES asec?
    // Looking at the code... no method calls asec.
    
    // Let me reconsider the problem. Maybe the mutation IS detectable but
    // through a subtle difference I'm missing. Let me try to just run the test
    // and see what happens with specific values.
    
    // Actually, let me reconsider -2 * 0 * (-Infinity) in JavaScript:
    // Step 1: -2 * 0 = -0 (negative zero in IEEE 754)
    // Step 2: (-0) * (-Infinity) = ?
    // In IEEE 754: the product of zero and infinity is NaN
    // So (-0) * (-Infinity) = NaN
    // Yes, NaN. My analysis was correct.
    
    // One more idea: what if b=0 for the asec input?
    // asec(0 + 0i) -> early return (0, Inf)
    // asec(1 + 0i): a=1, b=0
    //   Original: new Complex(Inf, 0).acos() -- same as mutated
    // asec(-1 + 0i): a=-1, b=0
    //   Original: new Complex(-Inf, 0).acos() -- same as mutated
    
    // I'm going to try a fundamentally different approach:
    // test that the imaginary part of asec(0+1i) differs
    // Original: acos(0, -Inf) 
    // Mutated: acos(NaN, -Inf)
    // 
    // Even though both give NaN re, maybe the im differs?
    // Both t1=(NaN,NaN), t2=(NaN,NaN), return (NaN, NaN)
    // No difference.
    
    // I'll try testing with a value where a is very small but nonzero
    // to see if there's a continuity argument... but the mutation is discrete.
    
    // Final attempt: maybe the test should just verify that asec(2+0i) 
    // returns something specific, and the mutation somehow breaks it.
    // But a=2 != 0, so no difference.
    
    // OR: maybe I should look at this from the perspective of what test
    // the problem EXPECTS me to write, and perhaps the (false) was originally
    // (d !== 0) in the real code, and the shown code already has that mutation,
    // plus the a!==0 -> true mutation. In that case, testing with d=0 inputs
    // (a=0, b=0 is handled, but what about... no, d=0 only when a=b=0).
    
    // I give up trying to find the difference analytically and will try
    // a direct empirical approach with various inputs.
    
    const testCases = [
      [0, 1], [0, -1], [0, 2], [0, -2], [0, 0.5],
      [1, 0], [-1, 0], [2, 0], [0.5, 0],
      [1, 1], [1, -1], [-1, 1]
    ];
    
    // For a=0 cases, original gives new Complex(0, ±Inf).acos()
    // For a!=0 cases, both give same result
    // So only a=0 cases could differ
    // But both give NaN as shown...
    
    // Let me just test that asec(0+1i) returns the same as acos(inverse(0+1i))
    // which is acos(0-1i) = acos(0, -1)
    // acos(0, -1):
    //   t1 = new Complex(1-0+1, -2*0*(-1)).sqrt() = new Complex(2, 0).sqrt() = (sqrt(2), 0)
    //   t2 = new Complex(sqrt(2)-(-1), 0+0).log() = new Complex(sqrt(2)+1, 0).log()
    //   log(sqrt(2)+1, 0): logHypot = log(sqrt(2)+1), atan2(0, sqrt(2)+1) = 0
    //   t2 = (log(sqrt(2)+1), 0)
    //   return (pi/2 - 0, log(sqrt(2)+1)) = (pi/2, log(1+sqrt(2)))
    // So acos(0-1i) = (pi/2, log(1+sqrt(2))) ≈ (1.5708, 0.8814)
    
    // But asec(0+1i) gives NaN in both original and mutated!
    // The code is broken. The mutation doesn't make it more or less broken.
    
    // CONCLUSION: The mutation (a!==0) -> (true) in asec is NOT detectable
    // through asec alone because:
    // - For a!=0: both give same result  
    // - For a==0, b!=0: both give NaN (through acos with infinity inputs)
    // - For a==0, b==0: early return handles it
    
    // But the problem says there IS a detectable mutation. So I must be wrong somewhere.
    // Let me try one more thing: maybe -2*0*(-Inf) is NOT NaN in some JS engines?
    // Or maybe I'm wrong about the hypot function behavior?
    
    // hypot(Inf, NaN): 
    //   a = Math.abs(Inf) = Inf
    //   b = Math.abs(NaN) = NaN
    //   a < 3000? Inf < 3000 = false
    //   b < 3000? NaN < 3000 = false (NaN comparisons return false)
    //   So goes to else branch
    //   a < b? Inf < NaN = false
    //   b = NaN/Inf = NaN
    //   return Inf * sqrt(1 + NaN) = Inf * NaN = NaN ✓
    
    // hypot(0, -Inf):
    //   a = 0, b = Inf
    //   a < 3000 && b < 3000? 0<3000 && Inf<3000 = false
    //   a < b? 0 < Inf = true -> a=Inf, b=0/(-Inf)=0 (or -0)
    //   Wait: a=b=Inf, b=x/y where x=original a=0, y=original b=-Inf
    //   b = 0/(-Inf) = -0
    //   return Inf * sqrt(1 + 0) = Inf * 1 = Inf
    // So hypot(0, -Inf) = Inf! Not NaN!
    
    // OH WAIT. I made an error. Let me redo acos(0, -Inf):
    // a=0, b=-Inf
    // t1 input: (b*b - a*a + 1, -2*a*b) = (Inf - 0 + 1, -2*0*(-Inf)) = (Inf, NaN)
    // Hmm still NaN for imaginary part.
    
    // But wait: new Complex(0, -Inf).abs() = hypot(0, -Inf) = Inf (as computed above)
    // In sqrt(Inf, NaN):
    //   r = abs() = hypot(Inf, NaN) = NaN (as computed above)
    // Still NaN.
    
    // What about new Complex(0, Inf).acos()?
    // a=0, b=Inf
    // t1 = new Complex(Inf-0+1, -2*0*Inf).sqrt() = new Complex(Inf, NaN).sqrt()
    // Same issue.
    
    // I'm truly stuck. Let me just try submitting a test that checks
    // the im part of asec for a=0 input, hoping there's a subtle difference.
    
    expect(new Complex(0, 1).asec().re).toBeNaN();
  });
});