// Define the Complex class
class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  mul(c) {
    return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re);
  }
}

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    expect(result.toString()).toBe("6");
  });
});