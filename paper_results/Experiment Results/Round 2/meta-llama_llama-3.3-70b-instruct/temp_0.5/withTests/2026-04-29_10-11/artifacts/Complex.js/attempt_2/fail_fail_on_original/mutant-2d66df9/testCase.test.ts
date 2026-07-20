import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('parses complex number strings correctly with plus and minus signs', () => {
    const complexNumber1 = new Complex('1+2i');
    const complexNumber2 = new Complex('1-2i');
    expect(complexNumber1.re).toBe(1);
    expect(complexNumber1.im).toBe(2);
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(-2);
  });
});