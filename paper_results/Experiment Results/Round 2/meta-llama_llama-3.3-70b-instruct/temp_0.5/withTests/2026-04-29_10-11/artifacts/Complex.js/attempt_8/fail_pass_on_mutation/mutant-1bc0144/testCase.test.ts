describe('Complex', () => {
  class Complex {
    constructor(private re: number, private im: number) {}

    asec() {
      const a = this.re;
      const b = this.im;

      if (a === 0 && b === 0) {
        return new Complex(0, Infinity);
      }

      const d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d)
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0);
    }
  }

  it('should not be undefined when accessing a property in asec method', () => {
    const complex = new Complex(2, 0);
    const asec = complex.asec;
    expect(() => {
      const result = asec.call({ re: 2, im: 0 });
      expect(result.re).not.toBeNaN();
    }).not.toThrowError();
  });
});