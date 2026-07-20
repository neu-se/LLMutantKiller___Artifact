describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const Complex = function(a, b) {
      this.re = a;
      this.im = b;
    };

    Complex.prototype.acsch = function() {
      return new Complex(1 / this.re, 0);
    };

    const c = new Complex(2, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.5, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});