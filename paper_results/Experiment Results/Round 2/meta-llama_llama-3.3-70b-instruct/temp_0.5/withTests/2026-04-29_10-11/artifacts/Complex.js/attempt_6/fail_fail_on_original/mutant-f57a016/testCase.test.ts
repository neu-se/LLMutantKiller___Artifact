import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber1 = new Complex('1+2i');
    expect(complexNumber1.re).toBe(1);
    expect(complexNumber1.im).toBe(2);

    const complexNumber2 = new Complex('1');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(0);

    expect(() => new Complex('1+')).toThrow(SyntaxError);
  });
});