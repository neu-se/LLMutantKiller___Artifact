const complex = { re: 1, im: 2, clone: function() { return { re: this.re, im: this.im }; } };

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const clone = complex.clone();
    expect(clone).not.toBeNull();
    expect(typeof clone).toBe('object');
    expect(clone).not.toBe(complex);
    expect(clone.re).toBe(complex.re);
    expect(clone.im).toBe(complex.im);
    complex.re = 3;
    complex.im = 4;
    expect(clone.re).not.toBe(complex.re);
    expect(clone.im).not.toBe(complex.im);
  });
});