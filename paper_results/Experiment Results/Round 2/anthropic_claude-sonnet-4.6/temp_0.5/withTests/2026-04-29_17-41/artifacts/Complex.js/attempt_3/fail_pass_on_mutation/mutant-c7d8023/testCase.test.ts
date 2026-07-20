import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch', () => {
  it('computes acsch for NaN input consistently', () => {
    // With NaN input: b === 0 is false, d = NaN, (d !== 0) is false
    // Original: (b !== 0) ? -b/0 : 0 => (-NaN/0) = NaN for im
    // Mutated: (b === 0) ? -b/0 : 0 => 0 for im
    const result = new Complex(NaN, NaN).acsch();
    expect(isNaN(result.im)).toBe(true);
  });
});