import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsc mutation detection', () => {
  it('acsc with zero real part and subnormal imaginary part should not be NaN', () => {
    // Number.MIN_VALUE squared underflows to 0, so d = 0 but b !== 0
    // This forces the else branch where original uses (a !== 0) but mutant uses (true)
    // With a=0: original gives re=0, mutant gives re=NaN (0/0)
    const minVal = Number.MIN_VALUE; // 5e-324
    expect(minVal * minVal).toBe(0); // confirm underflow
    const result = new Complex(0, minVal).acsc();
    expect(result.isNaN()).toBe(false);
  });
});