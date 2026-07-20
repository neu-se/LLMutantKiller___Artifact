import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication short circuit for real values", () => {
  it("should return correct result when multiplying two real complex numbers (both im === 0)", () => {
    const a = new Complex(5, 0);
    const b = new Complex(7, 0);
    const result = a.mul(b);
    // In the original code, the short circuit returns new Complex(5*7, 0) = Complex(35, 0)
    // In the mutated code, the short circuit does nothing (empty block), so it falls through
    // to the general formula: re = 5*7 - 0*0 = 35, im = 5*0 + 0*7 = 0
    // Wait, the general formula also gives 35+0i for real inputs...
    // Need a case where the short circuit matters differently.
    // Actually the short circuit returns early with Complex(re*re, 0),
    // but the general formula gives the same result for real numbers.
    // The mutation makes the if block empty, so it falls through to the general formula.
    // For real numbers both give the same answer, so we need to test
    // that the SHORT CIRCUIT path is taken vs the general path.
    // The difference only matters if there's a floating point difference.
    // Let's use very large numbers where floating point might differ.
    const large = new Complex(1e200, 0);
    const large2 = new Complex(1e200, 0);
    const res = large.mul(large2);
    // Original: returns Complex(1e200 * 1e200, 0) = Complex(Infinity, 0)
    // Mutated: falls through to general formula: re = 1e200*1e200 - 0*0 = Infinity, im = 1e200*0 + 0*1e200 = 0
    // Same result again... Let me think differently.
    // The mutation removes the early return. For real inputs, the general formula gives the same.
    // But wait - what if this['im'] === 0 but z['im'] !== 0? Then the short circuit doesn't apply.
    // The mutation makes the block empty but doesn't change the condition check.
    // The only observable difference: original returns early from inside the if block,
    // mutated falls through to general formula.
    // For real*real: original = Complex(a*b, 0), mutated = Complex(a*b - 0*0, a*0 + 0*b) = Complex(a*b, 0)
    // These are identical! The mutation cannot be detected this way for purely real inputs.
    // 
    // WAIT - re-reading the mutation: original has `return new Complex(this['re'] * z['re'], 0);`
    // mutated has empty block `{}` - so it falls through to general formula.
    // For real numbers the results are mathematically identical.
    // 
    // The test needs to detect that the return statement is missing.
    // This means we need a case where NOT returning early causes a different result.
    // That can't happen for real*real since math is the same.
    // 
    // UNLESS: we use NaN or special values where 0*NaN = NaN vs explicit 0.
    const nanComplex = new Complex(NaN, 0);
    const realComplex = new Complex(2, 0);
    const nanResult = nanComplex.mul(realComplex);
    // Original short circuit: Complex(NaN * 2, 0) = Complex(NaN, 0) - im is explicitly 0
    // Mutated general formula: re = NaN*2 - 0*0 = NaN, im = NaN*0 + 0*2 = NaN
    // So im differs: 0 vs NaN!
    expect(nanResult.im).toBe(0);
  });
});