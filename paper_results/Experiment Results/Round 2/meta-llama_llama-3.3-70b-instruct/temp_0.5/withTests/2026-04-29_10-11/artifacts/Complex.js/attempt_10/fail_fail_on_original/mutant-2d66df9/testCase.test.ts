describe('Complex.js', () => {
  it('parses complex number strings correctly with plus and minus signs', () => {
    const Complex = require('./complex.js').Complex;
    const complexNumber1 = new Complex('1+2i');
    expect(complexNumber1.re).toBe(1);
    expect(complexNumber1.im).toBe(2);
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
    const complexNumber6 = new Complex('0+0i');
    expect(complexNumber6.re).toBe(0);
    expect(complexNumber6.im).toBe(0);
    const complexNumber7 = new Complex('0-0i');
    expect(complexNumber7.re).toBe(0);
    expect(complexNumber7.im).toBe(0);
  });
});