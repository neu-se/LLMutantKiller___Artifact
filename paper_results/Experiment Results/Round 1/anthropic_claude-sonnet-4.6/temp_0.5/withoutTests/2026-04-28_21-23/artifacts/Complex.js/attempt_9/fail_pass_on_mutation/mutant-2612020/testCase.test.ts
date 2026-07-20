import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should reset re to 0 even when Object prototype is manipulated", () => {
    // In original: z[""] = z['re'] = 0 sets z['re'] explicitly
    // In mutated: z[""] = z[""] = 0, z['re'] not set by placeholder
    // z = { 're': 0, 'im': 0 } has OWN re property, so prototype doesn't matter
    // BUT: what if we delete the own property somehow? We can't from outside.
    
    // Let me try manipulating Object.prototype temporarily
    const originalRe = Object.prototype['re' as any];
    try {
      (Object.prototype as any)['re'] = 99;
      // z = { 're': 0, 'im': 0 } still has own 're' = 0, so this won't help
      const c = new Complex("5i");
      expect(c.re).toBe(0);
      expect(c.im).toBe(5);
    } finally {
      if (originalRe === undefined) {
        delete (Object.prototype as any)['re'];
      } else {
        (Object.prototype as any)['re'] = originalRe;
      }
    }
  });
});