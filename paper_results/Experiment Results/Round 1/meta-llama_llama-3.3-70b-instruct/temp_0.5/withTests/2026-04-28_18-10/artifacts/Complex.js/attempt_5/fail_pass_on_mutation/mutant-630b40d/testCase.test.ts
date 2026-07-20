describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new (function Complex(a, b) {
      this.re = a;
      this.im = b;
    })(3, 4);
    const hypot = Math.sqrt(complex.re * complex.re + complex.im * complex.im);
    expect(hypot).toBeCloseTo(5, 10);
  });
});