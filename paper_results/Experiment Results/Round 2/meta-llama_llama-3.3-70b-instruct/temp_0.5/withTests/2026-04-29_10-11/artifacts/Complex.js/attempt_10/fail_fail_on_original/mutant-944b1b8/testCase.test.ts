import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return correct value for asech when a is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBeCloseTo(Infinity);
    expect(result2.im).toBeCloseTo(0);
    const complex3 = new Complex(0.5, 0);
    const result3 = complex3.asech();
    expect(result3.re).toBeCloseTo(1.3169578969248166);
    expect(result3.im).toBeCloseTo(0);
  });
});