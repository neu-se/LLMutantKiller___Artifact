describe('Complex', () => {
  it('should throw an error when calling an undefined method', () => {
    const Complex = function(a: number, b: number) {
      this.re = a;
      this.im = b;
    };
    Complex.prototype.acosh = function() {
      var res = this.acos();
      if (res.im <= 0) {
        var tmp = res.re;
        res.re = -res.im;
        res.im = tmp;
      } else {
        var tmp = res.im;
        res.im = -res.re;
        res.re = tmp;
      }
      return res;
    };
    Complex.prototype.acos = function() {
      return { re: 1, im: 0 };
    };
    const complex = new Complex(1, 0);
    expect(complex.acosh.toString()).toContain('acos');
    expect(() => complex['']()).toThrow();
  });
});