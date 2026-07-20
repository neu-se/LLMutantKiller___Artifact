import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('acsc of subnormal real number should return finite result', () => {
    // 1e-200 squared underflows to 0, so d=0, hitting the fallback branch
    // Original: b=0, so (b !== 0) is false, im=0, calls asin(Infinity, 0)
    // Mutated:  b=0, so (b === 0) is true, im=-0/0=NaN, calls asin(Infinity, NaN)
    const result = new Complex(1e-200, 0).acsc();
    expect(isNaN(result.re)).toBe(false);
  });
});