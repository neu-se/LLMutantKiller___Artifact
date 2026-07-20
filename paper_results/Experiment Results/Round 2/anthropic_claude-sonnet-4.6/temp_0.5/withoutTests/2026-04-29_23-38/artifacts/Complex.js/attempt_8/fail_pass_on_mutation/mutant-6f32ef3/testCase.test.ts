import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should correctly handle toString for number with zeroed real part and zero imaginary part', () => {
    // a=1e-16 gets zeroed, b=0 triggers early return - both should give "0"
    // But if somehow b=0 reaches else-if, mutated adds "-" making "-0i"
    const c = new Complex(1e-16, 1e-16); // both get zeroed
    expect(c.toString()).toBe('0');
  });
});