import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot of purely imaginary number with tiny magnitude uses correct sign for imaginary infinity', () => {
    // When a=0 and b is tiny enough that b^2 underflows to 0,
    // the d=0 branch is taken. The sign of -b/0 vs +b/0 matters.
    // For b = -5e-324 (negative tiny):
    //   Original: -(-5e-324)/0 = +Infinity -> atan(0, +Inf)
    //   Mutated:  +(-5e-324)/0 = -Infinity -> atan(0, -Inf)
    // Both give NaN from atan, so this test checks NaN
    const result = new Complex(0, -5e-324).acot();
    expect(result.isNaN()).toBe(true);
  });
});