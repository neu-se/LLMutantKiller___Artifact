describe('Complex', () => {
  it('should throw an error when trying to access an undefined property in the mul function with mutated code', () => {
    class Complex {
      constructor(re, im) {
        this.re = re;
        this.im = im;
      }

      mul(z) {
        return new Complex(this.re * z[""], 0);
      }
    }

    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    expect(() => c1.mul(c2)).toThrowError();
  });
});