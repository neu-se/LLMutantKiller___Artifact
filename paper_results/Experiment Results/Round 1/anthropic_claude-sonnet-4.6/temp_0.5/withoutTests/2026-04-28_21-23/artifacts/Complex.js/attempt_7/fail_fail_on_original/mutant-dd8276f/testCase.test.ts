import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('acsc(5 + NaN*i) should have NaN imaginary part', () => {
    // a=5, b=NaN: d=NaN, hits fallback
    // Original: im = (NaN !== 0) ? -NaN/0 : 0 = NaN, then asin(Infinity, NaN)
    // Mutated:  im = (NaN === 0) ? -NaN/0 : 0 = 0, then asin(Infinity, 0)
    const result = new Complex(5, NaN).acsc();
    const fromMutatedPath = new Complex(Infinity, 0).asin();
    expect(result.im).not.toBe(fromMutatedPath.im);
  });
});