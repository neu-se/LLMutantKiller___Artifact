import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc with denormalized input', () => {
  it('should return Infinity real part when input is extremely small non-zero real', () => {
    // With a = Number.MIN_VALUE, b = 0:
    // d = a*a + b*b = 0 (underflow), but a !== 0
    // Original: re = a / 0 = Infinity
    // Mutated: re = 0
    const tiny = Number.MIN_VALUE;
    const result = new Complex(tiny, 0).acsc();
    expect(result.re).toBe(Infinity);
  });
});