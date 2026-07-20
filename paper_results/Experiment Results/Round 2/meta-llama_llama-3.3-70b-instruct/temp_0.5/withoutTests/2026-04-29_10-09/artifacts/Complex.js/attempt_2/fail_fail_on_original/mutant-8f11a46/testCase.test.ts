import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should parse a complex number from a string correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(2);
    const complex2 = new Complex('2');
    expect(complex2.re).toBeCloseTo(2);
    expect(complex2.im).toBeCloseTo(0);
    const complex3 = new Complex('3.5');
    expect(complex3.re).toBeCloseTo(3.5);
    expect(complex3.im).toBeCloseTo(0);
  });
});