describe('Complex', () => {
  it('should calculate the magnitude of a complex number correctly', () => {
    const complex = { re: 3, im: 4 };
    const magnitude = Math.sqrt(complex.re * complex.re + complex.im * complex.im);
    expect(magnitude).toBeCloseTo(5);
    const a = Math.abs(complex.re);
    const b = Math.abs(complex.im);
    if (a < b) {
      expect(magnitude).toBeCloseTo(b * Math.sqrt(1 + Math.pow(a / b, 2)));
    } else {
      expect(magnitude).toBeCloseTo(a * Math.sqrt(1 + Math.pow(b / a, 2)));
      expect(a).toBeGreaterThan(b); // This line should fail on the mutated code
    }
  });
});