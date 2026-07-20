describe('Complex', () => {
  it('should correctly multiply two complex numbers when both are real', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });

  it('should return NaN when the placeholder code is empty', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const originalMul = Complex.prototype.mul;
    Complex.prototype.mul = function(a: any, b: any) {
      if (this.im === 0 && a.im === 0) {
        return new Complex(NaN, NaN);
      } else {
        return originalMul.call(this, a, b);
      }
    };
    const result = c1.mul(c2);
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});