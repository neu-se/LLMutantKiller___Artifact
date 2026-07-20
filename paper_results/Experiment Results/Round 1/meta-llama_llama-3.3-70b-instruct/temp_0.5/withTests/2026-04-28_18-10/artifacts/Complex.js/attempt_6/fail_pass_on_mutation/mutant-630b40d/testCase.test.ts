describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new (function Complex(a, b) {
      this.re = a;
      this.im = b;
    })(3, 4);
    const hypot = complex.re * Math.sqrt(1 + complex.im * complex.im / (complex.re * complex.re));
    expect(hypot).toBeCloseTo(5, 10);
  });
});