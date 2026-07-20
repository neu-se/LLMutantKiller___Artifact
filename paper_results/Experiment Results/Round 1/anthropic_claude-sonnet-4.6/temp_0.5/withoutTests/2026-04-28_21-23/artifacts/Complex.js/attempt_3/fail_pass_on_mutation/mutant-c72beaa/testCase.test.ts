import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('should produce NaN for subnormal inputs where d underflows with nonzero a and b', () => {
    const tiny = 5e-324; // Number.MIN_VALUE - squaring causes underflow to 0
    // d = tiny^2 + tiny^2 = 0 (underflow), b=tiny !== 0 so no early return
    // Original: a/0 = Infinity => new Complex(Infinity, -Infinity).atan() => NaN
    // Mutated: a*0 = 0 => new Complex(0, -Infinity).atan() => Complex(-PI/2, 0)
    const result = new Complex(tiny, tiny).acot();
    expect(result.isNaN()).toBe(true);
  });
});