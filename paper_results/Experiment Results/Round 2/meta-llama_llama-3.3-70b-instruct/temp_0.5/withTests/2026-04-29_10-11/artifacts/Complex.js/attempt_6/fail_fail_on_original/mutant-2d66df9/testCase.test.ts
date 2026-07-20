import { Complex } from '../complex';

describe('Complex.js', () => {
  it('parses complex number strings correctly with plus and minus signs', () => {
    const complexNumber = new Complex('1-2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(-2);
    const complexNumber2 = new Complex('1+2i');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(2);
  });
});