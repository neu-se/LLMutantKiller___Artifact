import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should handle string parsing where one component becomes NaN", () => {
    // '1e' - parseFloat('1e') = NaN in some environments
    // Let's check: tokens for '1e' might be ['1e'] or ['1', 'e']
    // If parseFloat('1e') = NaN, then z.re = NaN, z.im = 0
    // Original (||): true -> empty block -> {re:NaN, im:0}
    // Mutated (&&): false -> skip -> {re:NaN, im:0}
    // Same...
    
    // What about the number 0/0 = NaN passed as single arg?
    // new Complex(0/0) -> z.re=NaN, z.im=0
    // Same in both versions
    
    // I need to find something where the CONDITION EVALUATION itself matters
    // The only way || vs && differs: when first operand is FALSE
    // isNaN(z.re) is FALSE when re is valid number
    // So: re=valid, im=NaN -> original: false||true=true, mutated: false&&true=false
    // Block is empty so no difference...
    
    // UNLESS: what if we look at this through the lens of
    // what happens when parse is called from WITHIN a method?
    // Like: new Complex(result_of_computation)
    // where result has re=valid, im=NaN
    
    // cot function: d = cos(2a) - cosh(2b)
    // If d=0: sin(2a)/0 = ±Infinity, sinh(2b)/0 = ±Infinity
    // Not NaN
    
    // What if we call .add() which internally creates new Complex?
    // new Complex(NaN, undefined) -> b is undefined, so switch on typeof NaN
    // typeof NaN = 'number' -> z.re=NaN, z.im=0
    // Same as before
    
    const c = new Complex(0/0);
    expect(c.isNaN()).toBe(true);
  });
});