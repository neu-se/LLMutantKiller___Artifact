import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);

    const complexNumber2 = new Complex('1+2');
    expect(complexNumber2.im).toBe(0);
    expect(() => new Complex('1+')).toThrow(SyntaxError);
  });
});