const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should parse a complex number from a string correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1, 5);
    expect(complex.im).toBeCloseTo(2, 5);
    const complex2 = new Complex('1');
    expect(complex2.re).toBeCloseTo(1, 5);
    expect(complex2.im).toBeCloseTo(0, 5);
    const complex3 = new Complex('1.5');
    expect(complex3.re).toBeCloseTo(1.5, 5);
    expect(complex3.im).toBeCloseTo(0, 5);
    const complex4 = new Complex('1+2i');
    expect(complex4.re).toBeCloseTo(1, 5);
    expect(complex4.im).toBeCloseTo(2, 5);
    const complex5 = new Complex('a');
    expect(complex5.re).toBeNaN();
    expect(complex5.im).toBeNaN();
    const complex6 = new Complex('1+2');
    expect(complex6.re).toBeCloseTo(1, 5);
    expect(complex6.im).toBeCloseTo(2, 5);
    expect(() => new Complex('1+2i')).not.toThrow();
    expect(() => new Complex('1')).not.toThrow();
    expect(() => new Complex('1.5')).not.toThrow();
    expect(() => new Complex('a')).toThrow();
  });
});