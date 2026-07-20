import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with subnormal b where b*b underflows: original gives NaN, mutated does not", () => {
    // Find a value where b*b === 0 but b !== 0
    // 2^-537 * 2^-537 = 2^-1074 which is below MIN_VALUE (2^-1074 is actually MIN_VALUE!)
    // So we need something smaller: 2^-538 * 2^-538 = 2^-1076 < 2^-1074 -> underflows to 0
    // 2^-538 in JS: Number.MIN_VALUE / 4 = 5e-324 / 4... but 5e-324 is already the smallest
    // Actually Number.MIN_VALUE IS 2^-1074, so MIN_VALUE * MIN_VALUE = 2^-2148 which underflows
    
    // Let me verify differently: use a known underflowing pair
    // 1e-200 * 1e-200 = 1e-400 which underflows to 0
    const b = 1e-200;
    // But b*b = 1e-400 which is 0 in JS? Let's check: 1e-308 is near MIN_NORMAL
    // Actually subnormals go down to 5e-324, so 1e-400 definitely underflows to 0
    
    const z = new Complex(0, b);
    const result = z.acsch();
    
    // d = 0 + b*b = 0 (underflow), b != 0
    // Original: new Complex(0, -b/0 = -Infinity).asinh() -> NaN (as traced)
    // Mutated:  new Complex(0, +b/0 = +Infinity).asinh() -> (Infinity, pi/2)
    expect(result.isNaN()).toBe(true);
  });
});