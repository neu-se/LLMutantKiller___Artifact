const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone).not.toBeNull();
    expect(typeof clone).toBe('object');
    expect(clone).not.toBe(complex);
    expect(clone.re).toBe(complex.re);
    expect(clone.im).toBe(complex.im);
    complex.re = 3;
    complex.im = 4;
    expect(clone.re).toBe(1);
    expect(clone.im).toBe(2);
    expect(Object.keys(clone)).toEqual(['re', 'im']);
  });
});