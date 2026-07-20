describe("Complex", () => {
  it("should correctly calculate sech", () => {
    const complex = new (function Complex(a, b) {
      this.re = a;
      this.im = b;
    })(1, 1);
    complex.sech = function() {
      var a = this.re;
      var b = this.im;
      var d = Math.cos(2 * a) + Math.cosh(2 * b);
      return { re: 2 / d, im: -2 * Math.sinh(a) * Math.sin(b) / d };
    };
    const result = complex.sech();
    expect(result.im).not.toBeCloseTo(-2 / Math.sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1)), 3);
  });
});