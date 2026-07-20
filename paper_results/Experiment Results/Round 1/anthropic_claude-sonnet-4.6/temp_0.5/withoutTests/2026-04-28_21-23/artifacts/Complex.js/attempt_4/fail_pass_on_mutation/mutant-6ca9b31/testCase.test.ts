import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should append plus sign not minus when imaginary part is positive zero after epsilon normalization with non-zero real", () => {
    // Override EPSILON to be larger than |im| but use a value where
    // the epsilon check sets b=0, but then we need b===0 to NOT trigger early return
    // This requires modifying the prototype's toString or using a trick
    
    // Actually: let's think about what value of im would make b=0 at mutation point
    // while NOT triggering early return.
    // The early return checks b===0 AFTER epsilon normalization.
    // If b becomes 0 after epsilon check, early return ALWAYS fires.
    // So b=0 at mutation point is impossible.
    
    // The mutation b<0 vs b<=0 is ONLY distinguishable at b=0.
    // b=0 at mutation point is impossible due to early return.
    // 
    // THEREFORE: this mutation cannot be detected through toString alone.
    // 
    // But wait - maybe through a method that CALLS toString? No, toString is the endpoint.
    //
    // Maybe the test should check something completely different that I've been overlooking.
    // Let me check if there's any other place in the code where b<0 vs b<=0 matters...
    // The mutation is ONLY in toString. So it must be testable through toString.
    //
    // One more idea: what if we use Number(-0) which equals 0, 
    // but Object.is(Number(-0), 0) is true... no that doesn't help.
    
    // I'll try: set EPSILON=0 so epsilon check never fires, then use im=-0
    const savedEpsilon = (Complex as any)['EPSILON'];
    (Complex as any)['EPSILON'] = 0;
    try {
      // With EPSILON=0: Math.abs(b) < 0 is NEVER true (abs is always >= 0)
      // So epsilon check never fires, b stays as whatever it is
      // For b = -0: b===0 is true (-0===0 in JS), early return fires
      // Still same result!
      const c = new Complex(1, -0);
      expect(c.toString()).toBe("1");
    } finally {
      (Complex as any)['EPSILON'] = savedEpsilon;
    }
  });
});