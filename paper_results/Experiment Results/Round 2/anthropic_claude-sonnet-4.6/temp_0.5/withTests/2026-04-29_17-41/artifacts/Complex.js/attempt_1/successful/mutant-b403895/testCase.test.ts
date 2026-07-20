import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation test', () => {
  it('should return Infinity real part when asec is called with a very small non-zero real number causing d to underflow to 0', () => {
    // Use a very small number so that a*a + b*b underflows to 0
    // but a itself is non-zero, triggering the (a !== 0) ? a / 0 : 0 branch
    // Original: a / 0 = Infinity; Mutated: a * 0 = 0
    const tinyA = 5e-324; // smallest positive double
    const c = new Complex(tinyA, 0);
    const result = c.asec();
    // In original code: d = tinyA*tinyA + 0 = 0 (underflow), a !== 0, so a/0 = Infinity
    // The .acos() of Complex(Infinity, 0) should give a real result
    // In mutated code: a*0 = 0, so Complex(0, 0).acos() = PI/2
    expect(result.re).not.toBeCloseTo(Math.PI / 2, 5);
  });
});