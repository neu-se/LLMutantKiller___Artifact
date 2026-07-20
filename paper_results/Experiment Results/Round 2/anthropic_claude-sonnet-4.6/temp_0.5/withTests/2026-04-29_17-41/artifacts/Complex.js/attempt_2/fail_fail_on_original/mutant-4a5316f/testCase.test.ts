import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth underflow mutation detection', () => {
  it('should compute acoth with correct sign for imaginary part when d underflows to zero', () => {
    const tiny = Number.MIN_VALUE; // 5e-324
    // a = tiny (non-zero), b = tiny (non-zero)
    // d = tiny*tiny + tiny*tiny = 0 (underflow)
    // early return condition: a === 0 && b === 0 is FALSE (tiny !== 0)
    // so we reach the else branch
    // original: (b !== 0) ? -b / 0 : 0 = -tiny/0 = -Infinity
    // mutated:  (b !== 0) ? +b / 0 : 0 = +tiny/0 = +Infinity
    const c = new Complex(tiny, tiny);
    const result = c.acoth();
    // original produces atanh(tiny/0=Infinity, -Infinity) 
    // The imaginary part sign differs between original and mutated
    const resultNoIm = new Complex(tiny, 0).acoth();
    // For purely real tiny: goes through d !== 0 path
    // For complex tiny+tiny*i: d underflows
    // original im arg to atanh: -Infinity => atanh result has specific im sign
    // mutated im arg to atanh: +Infinity => atanh result has opposite im sign
    expect(result.im).toBeLessThan(0);
  });
});