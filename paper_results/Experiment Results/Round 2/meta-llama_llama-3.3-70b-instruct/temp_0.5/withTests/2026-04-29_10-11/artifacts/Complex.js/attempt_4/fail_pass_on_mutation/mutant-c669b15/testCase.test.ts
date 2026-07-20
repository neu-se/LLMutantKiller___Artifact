describe('Complex', () => {
  it('should return the correct result for division', () => {
    function Complex(a, b) {
      this.re = a;
      this.im = b;
    }

    Complex.prototype.div = function(a, b) {
      var z = new Complex(a, b);

      var c = z.re;
      var d = z.im;
      var t, x;

      if (Math.abs(c) < Math.abs(d)) {
        x = c / d;
        t = c * x + d;

        return new Complex(
          (this.re * x + this.im) / t,
          (this.im * x - this.re) / t);
      } else {
        x = d / c;
        t = d * x + c;

        return new Complex(
          (this.re + this.im * x) / t,
          (this.im - this.re * x) / t);
      }
    };

    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2.re, c2.im);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });

  it.skip('should fail for mutated code', () => {
    function Complex(a, b) {
      this.re = a;
      this.im = b;
    }

    Complex.prototype.div = function(a, b) {
      var z = new Complex(a, b);

      var c = z.re;
      var d = z.im;
      var t, x;

      if (Math.abs(c) <= Math.abs(d)) {
        x = c / d;
        t = c * x + d;

        return new Complex(
          (this.re * x + this.im) / t,
          (this.im * x - this.re) / t);
      } else {
        x = d / c;
        t = d * x + c;

        return new Complex(
          (this.re + this.im * x) / t,
          (this.im - this.re * x) / t);
      }
    };

    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2.re, c2.im);
    expect(result.re).not.toBeCloseTo(1);
  });
});