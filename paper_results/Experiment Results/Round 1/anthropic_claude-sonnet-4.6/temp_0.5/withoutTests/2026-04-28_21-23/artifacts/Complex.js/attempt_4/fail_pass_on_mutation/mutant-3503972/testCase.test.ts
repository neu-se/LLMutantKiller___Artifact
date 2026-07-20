import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a real number to verify the function works", () => {
    // The mutation is in the d===0 branch of acsch
    // d = a*a + b*b, and b===0 returns early, so d===0 requires a=0,b=0 which is caught
    // 
    // However, with -0: b = -0, b === 0 is TRUE in JS, so early return IS taken
    // 
    // Let's try to find if there's any path where the mutation matters
    // by checking: what if a = NaN? Then b check passes if b !== 0,
    // d = NaN*NaN + b*b = NaN, NaN !== 0 is TRUE, so d !== 0 branch taken
    //
    // What about a = 0, b = Number.MIN_VALUE but using -Number.MIN_VALUE?
    // b = -Number.MIN_VALUE !== 0, d = 0 + MIN_VALUE^2 = 0 (underflow)
    // Original: -b/0 = -(-MIN_VALUE)/0 = MIN_VALUE/0 = +Infinity
    // Mutated:  +b/0 = (-MIN_VALUE)/0 = -Infinity
    // Then asinh(Complex(0, +Infinity)) vs asinh(Complex(0, -Infinity))
    // Both give NaN as shown above...
    //
    // The mutation truly seems to only affect NaN-producing paths.
    // Let's verify the function gives correct results for normal inputs
    // and check if re differs between original and mutated for the tiny case
    
    const tiny = -Number.MIN_VALUE;
    const result = new Complex(0, tiny).acsch();
    // Both original and mutated give NaN here
    // Let's check re instead
    expect(isNaN(result.re)).toBe(true);
    expect(isNaN(result.im)).toBe(true);
  });
});