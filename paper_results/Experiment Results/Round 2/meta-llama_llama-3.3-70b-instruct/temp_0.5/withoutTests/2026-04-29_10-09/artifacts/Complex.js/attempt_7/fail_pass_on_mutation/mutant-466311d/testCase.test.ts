const Complex = function(a, b) {
  this.re = a;
  this.im = b;
  this.log = function() {
    var _a = Math.abs(this.re);
    var _b = Math.abs(this.im);
    if (_a < 3000 && _b < 3000) {
      return {
        re: Math.log(_a * _a + _b * _b) * 0.5,
        im: Math.atan2(this.im, this.re)
      };
    } else {
      var a = _a / 2;
      var b = _b / 2;
      return {
        re: 0.5 * Math.log(a * a + b * b) + Math.LN2,
        im: Math.atan2(this.im, this.re)
      };
    }
  };
};

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 0);
    const result = complex.log();
    const expected = {
      re: Math.log(3001),
      im: 0
    };
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});