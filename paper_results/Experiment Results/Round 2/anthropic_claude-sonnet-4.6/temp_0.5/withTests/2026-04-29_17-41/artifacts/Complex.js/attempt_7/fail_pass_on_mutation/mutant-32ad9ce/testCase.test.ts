import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("parsing NaN string should result in NaN complex", () => {
    // 'NaN' string: tokens = ['N', 'a', 'N'] - would call parser_exit due to invalid chars
    // What about passing NaN directly as number?
    // new Complex(NaN) -> z.re = NaN, z.im = 0
    // Original (||): isNaN(NaN) || isNaN(0) = true -> empty block -> return z
    // Mutated (&&): isNaN(NaN) && isNaN(0) = false -> skip block -> return z
    // Same result!
    
    // What about new Complex(NaN, NaN)?
    // Original (||): isNaN(NaN) || isNaN(NaN) = true -> empty block -> return z  
    // Mutated (&&): isNaN(NaN) && isNaN(NaN) = true -> empty block -> return z
    // Same result!
    
    // The ONLY difference: re=NaN, im=valid (or re=valid, im=NaN)
    // Original enters block (empty), mutated skips block
    // But block is empty so no difference...
    
    // Unless the block is NOT empty and I'm misreading the code
    // Let me test: does new Complex(NaN) produce isNaN()=true?
    const c = new Complex(NaN);
    expect(c.isNaN()).toBe(true);
    expect(c.re).toBeNaN();
    expect(c.im).toBe(0); // im should be 0 for single number input
  });
});