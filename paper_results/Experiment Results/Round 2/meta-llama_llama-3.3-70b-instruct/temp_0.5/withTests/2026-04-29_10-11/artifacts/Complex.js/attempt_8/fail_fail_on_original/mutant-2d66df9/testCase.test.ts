import { Complex } from './complex';

describe('Complex.js', () => {
  it('parses complex number strings correctly with plus and minus signs', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const complexNumber2 = new Complex('1-2i');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(-2);
    const complexNumber3 = new Complex('2-1i');
    expect(complexNumber3.re).toBe(2);
    expect(complexNumber3.im).toBe(-1);
    const complexNumber4 = new Complex('2+1i');
    expect(complexNumber4.re).toBe(2);
    expect(complexNumber4.im).toBe(1);
    const complexNumber5 = new Complex('-2+1i');
    expect(complexNumber5.re).toBe(-2);
    expect(complexNumber5.im).toBe(1);
    const complexNumber6 = new Complex('2-1i');
    expect(complexNumber6.re).toBe(2);
    expect(complexNumber6.im).toBe(-1);
  });
});