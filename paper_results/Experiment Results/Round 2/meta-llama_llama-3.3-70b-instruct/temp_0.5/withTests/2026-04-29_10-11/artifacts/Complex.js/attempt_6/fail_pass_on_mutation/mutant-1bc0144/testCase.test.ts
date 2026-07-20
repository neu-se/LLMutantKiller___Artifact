describe('Complex', () => {
  class Complex {
    constructor(re, im) {
      this.re = re;
      this.im = im;
    }

    asec() {
      var a = this.re;
      var b = this.im;

      if (a === 0 && b === 0) {
        return new Complex(0, Infinity);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d)
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0);
    }
  }

  it('should calculate asec correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0.5);
    expect(result.im).toBeCloseTo(0);
    expect(complex.re).toBe(2);
  });
});