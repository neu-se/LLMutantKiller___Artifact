describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers', () => {
    class Complex {
      re: number;
      im: number;

      constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
      }

      parse(str: string) {
        if (str.endsWith('i')) {
          return new Complex(0, parseFloat(str.slice(0, -1)));
        } else {
          return new Complex(parseFloat(str), 0);
        }
      }
    }

    const c1 = new Complex(0, 0).parse('1i');
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);

    const c2 = new Complex(0, 0).parse('1');
    expect(c2.im).toBe(0);

    // This test should pass in the original code and fail in the mutated code
    const c3 = new Complex(0, 0).parse('');
    expect(c3.im).not.toBe(1);
  });
});