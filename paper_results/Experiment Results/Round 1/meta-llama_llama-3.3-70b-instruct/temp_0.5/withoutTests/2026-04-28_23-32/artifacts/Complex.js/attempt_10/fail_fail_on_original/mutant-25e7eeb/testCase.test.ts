describe('Complex', () => {
  it('should throw an error when trying to access an undefined property in the mul function with mutated code', () => {
    class Complex {
      constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
      }

      mul(z: { re: number, im: number }) {
        return new Complex(this.re * z.re, this.im * z.im);
      }
    }

    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(() => {
      const mutatedC1 = new Complex(2, 0);
      const mutatedC2 = new Complex(3, 0);
      mutatedC1.mul({} as any);
    }).toThrowError();
  });
});