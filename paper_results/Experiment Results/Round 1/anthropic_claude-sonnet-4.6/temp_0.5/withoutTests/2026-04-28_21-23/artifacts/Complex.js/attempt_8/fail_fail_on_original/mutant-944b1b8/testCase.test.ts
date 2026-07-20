import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation', () => {
  it('asec with a=0 and b so small d underflows to 0 should differ between original and mutated', () => {
    // Use subnormal b where b*b === 0 but b !== 0, so d === 0 but early return is skipped
    // 5e-324 is the smallest positive double; (5e-324)^2 === 0
    const tinyB = 5e-324;
    // a=0, b=tinyB, d = 0 + tinyB*tinyB = 0 (underflow)
    // Early return check: a===0 && b===0? No, b=tinyB !== 0, so continues
    // d === 0, so takes else branch
    // Original: new Complex((0!==0)?0/0:0, (tinyB!==0)?-tinyB/0:0) = new Complex(0, -Infinity).acos()
    // Mutated:  new Complex((true)?0/0:0, (tinyB!==0)?-tinyB/0:0) = new Complex(NaN, -Infinity).acos()
    const result = new Complex(0, tinyB).asec();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});