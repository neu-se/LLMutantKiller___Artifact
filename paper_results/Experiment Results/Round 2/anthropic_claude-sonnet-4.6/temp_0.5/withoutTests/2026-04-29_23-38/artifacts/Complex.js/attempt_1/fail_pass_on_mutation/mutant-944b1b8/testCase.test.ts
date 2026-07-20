import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should correctly compute asec of a purely imaginary number', () => {
    // When a=0, b=1: d = 0 + 1 = 1, so (d !== 0) is false... wait
    // Actually d = a*a + b*b = 0 + 1 = 1, so d !== 0, takes the first branch
    // Need d === 0, but a=0 and b=0 is handled early...
    // Actually the condition is (false) always, so it always takes the else branch
    const result = new Complex(0, 1).asec();
    expect(isNaN(result.re)).toBe(false);
  });
});