import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('should return NaN for tiny real input where d underflows to zero (original uses a/0=Infinity, mutant uses a*0=0)', () => {
    const tiny = 5e-324; // smallest positive double; tiny*tiny underflows to 0
    // d = tiny*tiny + 0*0 = 0, a = tiny != 0
    // Original: new Complex(a/0=Infinity, 0).acos() => NaN
    // Mutant: new Complex(a*0=0, 0).acos() => finite value
    const result = new Complex(tiny, 0).asec();
    expect(result.isNaN()).toBe(true);
  });
});