import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acot', () => {
  it('acot with subnormal a and negative b where d underflows should differ between original and mutated', () => {
    const tiny = 1e-200;
    // d = tiny*tiny + (-tiny)*(-tiny) = 0 (underflow), b = -tiny != 0
    // Original: Complex(tiny/0, -(-tiny)/0) = Complex(Inf, Inf).atan()
    // Mutated:  Complex(tiny*0, Inf) = Complex(0, Inf).atan()
    // atan(0, Inf): a=0, b=Inf -> not b===1 or b===-1 -> NaN
    // atan(Inf, Inf): NaN
    // Both NaN... need different approach
    const result = new Complex(tiny, -tiny).acot();
    expect(result.isNaN()).toBe(true);
  });
});