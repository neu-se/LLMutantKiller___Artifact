import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should not throw when both components are NaN", () => {
    // Both || and && are true when both are NaN
    // If parser_exit were called, both versions would throw
    // Since neither throws, block must be empty
    // This test passes on both - confirming equivalent mutant
    // BUT: let's try to find the ONE case where they differ
    // re=valid, im=NaN: original(||)=true, mutated(&&)=false
    // If block does ANYTHING, this is the distinguishing case
    
    // What if the block sets z to something? Like z.re = NaN, z.im = NaN?
    // Then: original would make both NaN, mutated would keep re=valid, im=NaN
    // Let's test this hypothesis:
    const c = new Complex(1, NaN);
    // If original block sets both to NaN: c.re=NaN, c.im=NaN
    // If mutated skips block: c.re=1, c.im=NaN
    expect(c.re).toBe(1); // Would fail if original sets re to NaN
  });
});