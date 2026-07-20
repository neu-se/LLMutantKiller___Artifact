import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('acsc(0 + NaN*i) imaginary part should be NaN', () => {
    // a=0, b=NaN: d = 0 + NaN = NaN, so d !== 0 is false, hits fallback
    // Original: (b !== 0) => (NaN !== 0) => true => -NaN/0 = NaN => asin(0, NaN).im = NaN
    // Mutated:  (b === 0) => (NaN === 0) => false => 0 => asin(0, 0).im = 0
    const result = new Complex(0, NaN).acsc();
    expect(isNaN(result.im)).toBe(true);
  });
});