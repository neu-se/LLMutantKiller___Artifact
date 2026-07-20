import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN detection mutation", () => {
  it("should correctly identify NaN when imaginary part is NaN but real is not", () => {
    // Parse via object form: {re: 1, im: NaN}
    // Original (||): isNaN(1) || isNaN(NaN) = true -> enters if block
    // Mutated (&&): isNaN(1) && isNaN(NaN) = false -> skips if block
    // The if block contains only a commented-out parser_exit
    // So both should behave the same... 
    // UNLESS the if block in actual code has parser_exit() NOT commented out
    // Testing both possibilities:
    
    // If parser_exit IS active in original:
    // Original throws for {re:1, im:NaN}
    // Mutated does NOT throw for {re:1, im:NaN}
    
    // If parser_exit is NOT active:
    // Both behave identically
    
    // From previous tests we know new Complex(NaN, 0) does NOT throw on original
    // So parser_exit must be commented out
    // Therefore this mutation has no observable effect... 
    // But let's try the reverse: new Complex(NaN, NaN) 
    // Original (||): true -> no-op if -> return z (NaN, NaN)
    // Mutated (&&): true -> no-op if -> return z (NaN, NaN)
    // Same!
    
    // Only remaining theory: return z is inside the if block
    // For non-NaN input, original || is false, mutated && is false -> both skip if
    // For both-NaN input, both true -> both enter if -> return z
    // For one-NaN input: original enters if (returns z), mutated skips (returns undefined)
    const c = new Complex({ re: 1, im: NaN });
    expect(c.re).toBe(1);
    expect(isNaN(c.im)).toBe(true);
  });
});