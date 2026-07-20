function logHypot(a, b) {
  var _a = Math.abs(a);
  var _b = Math.abs(b);

  if (a === 0) {
    return Math.log(_b);
  }

  if (b === 0) {
    return Math.log(_a);
  }

  if (_a < 3000 && _b < 3000) {
    return Math.log(a * a + b * b) * 0.5;
  }

  a = a / 2;
  b = b / 2;

  return 0.5 * Math.log(a * a + b * b) + Math.LN2;
}

function Complex(a, b) {
  this.re = a;
  this.im = b;
}

Complex.prototype.atanh = function() {
  var a = this.re;
  var b = this.im;

  var x = (new Complex(1, 0).add(this)).div(new Complex(1, 0).sub(this));
  var temp = x.re;
  x.re = logHypot(x.re, x.im) / 2;
  x.im = Math.atan2(x.im, temp) / 2;
  return x;
};

Complex.prototype.add = function(other) {
  return new Complex(this.re + other.re, this.im + other.im);
};

Complex.prototype.sub = function(other) {
  return new Complex(this.re - other.re, this.im - other.im);
};

Complex.prototype.div = function(other) {
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
};

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
      var temp = x[""];
      x.re = logHypot(x.re, x.im) / 2;
      x.im = Math.atan2(x.im, temp) / 2;
      return x;
    };
    expect(() => c.atanh()).toThrow();
    Complex.prototype.atanh = originalAtanh;
  });
});