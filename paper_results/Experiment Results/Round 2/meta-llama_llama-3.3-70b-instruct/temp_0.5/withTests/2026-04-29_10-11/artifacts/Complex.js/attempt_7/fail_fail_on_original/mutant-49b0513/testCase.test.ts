class Complex {
  re: number;
  im: number;

  constructor(a: number, b: number) {
    this.re = a;
    this.im = b;
  }

  add(other: Complex): Complex {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  sub(other: Complex): Complex {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  div(other: Complex): Complex {
    var a = this.re;
    var b = this.im;
    var c = other.re;
    var d = other.im;
    var t, x;

    if (0 === d) {
      return new Complex(a / c, b / c);
    }

    if (Math.abs(c) < Math.abs(d)) {

      x = c / d;
      t = c * x + d;

      return new Complex(
        (a * x + b) / t,
        (b * x - a) / t);

    } else {

      x = d / c;
      t = d * x + c;

      return new Complex(
        (a + b * x) / t,
        (b - a * x) / t);
    }
  }

  atanh(): Complex {
    var a = this.re;
    var b = this.im;

    var x = (new Complex(1, 0).add(this)).div(new Complex(1, 0).sub(this));
    var temp = x.re;
    x.re = Math.log(x.re * x.re + x.im * x.im) / 2;
    x.im = Math.atan2(x.im, temp) / 2;
    return x;
  }
}

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const c = new Complex(1, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549);
    expect(result.im).toBeCloseTo(0);
  });

  it('should throw an error when atanh is called with a complex number and temp is not a number', () => {
    const c = new Complex(1, 0);
    const originalAtanh = Complex.prototype.atanh;
    Complex.prototype.atanh = function() {
      var a = this.re;
      var b = this.im;

      var x = (new Complex(1, 0).add(this)).div(new Complex(1, 0).sub(this));
      try {
        var temp = x[""];
        x.re = Math.log(x.re * x.re + x.im * x.im) / 2;
        x.im = Math.atan2(x.im, temp) / 2;
      } catch (error) {
        throw error;
      }
      return x;
    };
    expect(() => c.atanh()).toThrow();
    Complex.prototype.atanh = originalAtanh;
  });
});