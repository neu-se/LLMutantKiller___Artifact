import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('detects mutation: acot with subnormal imaginary part produces NaN in original', () => {
    const tiny = 5e-324; // smallest positive double; tiny*tiny underflows to 0
    const result = new Complex(0, tiny).acot();
    // Original path: d=0, b!==0 => new Complex(0, -Infinity).atan() => NaN
    // Mutated path: d=0, false => new Complex(0, 0).atan() => Complex(0,0), not NaN
    expect(result.isNaN()).toBe(true);
  });
});