import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects sign mutation by checking asinh(0, -Inf) differs from asinh(0, +Inf)", () => {
    const posInf = new Complex(0, Infinity).asinh();
    const negInf = new Complex(0, -Infinity).asinh();
    
    // These should differ - if they do, we can detect the mutation
    // If posInf and negInf differ in im sign, then acsch with b=MIN_VALUE 
    // (original: negInf path) vs (mutated: posInf path) will differ
    
    // For b = Number.MIN_VALUE > 0:
    // Original: new Complex(0, -b/0) = new Complex(0, -Inf).asinh() 
    // Mutated:  new Complex(0, +b/0) = new Complex(0, +Inf).asinh()
    const z = new Complex(0, Number.MIN_VALUE);
    const result = z.acsch();
    
    // Result should match negInf path (original), not posInf path (mutated)
    expect(Object.is(result.re, negInf.re)).toBe(true);
    expect(Object.is(result.im, negInf.im)).toBe(true);
  });
});