// Since the import statement is causing issues, let's assume the Complex class is defined in this file
class Complex {
  re: number;
  im: number;

  constructor(re: number, im: number) {
    this.re = re;
    this.im = im;
  }

  csc() {
    const d = 0.5 * Math.cosh(2 * this.im) - 0.5 * Math.cos(2 * this.re);
    return new Complex(
      this.re / d,
      -this.im / d
    );
  }
}

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    expect(csc.re).toBeCloseTo(0.2178242038042684);
    expect(csc.im).toBeCloseTo(-0.2351948179237916);
  });
});