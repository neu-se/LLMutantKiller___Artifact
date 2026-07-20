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
          -b / d).acos()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).acos();
    }

    acos() {
      // acos(c) = i * log(c - i * sqrt(1 - c^2))

      var a = this.re;
      var b = this.im;

      var t1 = new Complex(
        b * b - a * a + 1,
        -2 * a * b)['sqrt']();

      var t2 = new Complex(
        t1.re - b,
        t1.im + a)['log']();

      return new Complex(Math.PI / 2 - t2.im, t2.re);
    }

    sqrt() {
      var a = this.re;
      var b = this.im;
      var r = Math.sqrt(a * a + b * b);

      var re, im;

      if (a >= 0) {

        if (b === 0) {
          return new Complex(Math.sqrt(a), 0);
        }

        re = 0.5 * Math.sqrt(2.0 * (r + a));
      } else {
        re = Math.abs(b) / Math.sqrt(2 * (r - a));
      }

      if (a <= 0) {
        im = 0.5 * Math.sqrt(2.0 * (r - a));
      } else {
        im = Math.abs(b) / Math.sqrt(2 * (r + a));
      }

      return new Complex(re, b < 0 ? -im : im);
    }

    log() {
      var a = this.re;
      var b = this.im;

      if (b === 0 && a > 0) {
        return new Complex(Math.log(a), 0);
      }

      return new Complex(
        Math.log(Math.sqrt(a * a + b * b)),
        Math.atan2(b, a));
    }
  }

  it('should calculate asec correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});