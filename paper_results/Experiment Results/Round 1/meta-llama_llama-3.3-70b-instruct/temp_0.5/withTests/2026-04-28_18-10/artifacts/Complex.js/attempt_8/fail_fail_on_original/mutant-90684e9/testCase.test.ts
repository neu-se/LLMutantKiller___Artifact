const Complex = require('./complex');

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const original = new Complex(1, 2);
    const clone = original.clone();
    expect(clone.re).toBe(original.re);
    expect(clone.im).toBe(original.im);
    clone.re = 3;
    expect(original.re).not.toBe(clone.re);
  });
});