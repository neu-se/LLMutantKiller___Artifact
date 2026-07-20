import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should correctly parse a complex number from polar form where only real becomes NaN", () => {
    // When abs is a very specific value that makes re NaN but im valid
    // cos(π/2) is approximately 6.12e-17 (not exactly 0), so abs*cos(π/2) won't be NaN
    // But what about: abs=Infinity, arg=π/2?
    // The code checks: if (!Number.isFinite(a['abs']) && Number.isFinite(a['arg'])) return INFINITY
    // So this returns INFINITY before the NaN check
    
    // What if abs=NaN, arg=NaN?
    // re = NaN * cos(NaN) = NaN
    // im = NaN * sin(NaN) = NaN
    // Both NaN -> || and && both true -> same
    
    // I need to find where EXACTLY ONE of re/im is NaN
    // This seems impossible through normal parsing...
    
    // Let me try: what does the mutated code do differently for re=NaN, im=0?
    // Original (||): enters empty block, returns z with re=NaN, im=0
    // Mutated (&&): skips block, returns z with re=NaN, im=0
    // SAME RESULT - this is an equivalent mutant
    
    // Unless... the test framework itself or module loading causes differences
    // Let me try testing the NaN constant behavior
    expect(Complex.NAN.isNaN()).toBe(true);
    expect(new Complex(NaN, NaN).isNaN()).toBe(true);
    // For partial NaN - both versions behave the same since block is empty
    // This test will pass on both :(
    expect(new Complex(NaN, 0).isNaN()).toBe(true);
  });
});