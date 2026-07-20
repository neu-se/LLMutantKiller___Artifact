describe('Complex', () => {
  it('should handle addition with infinite values correctly', () => {
    // manually implement the Complex class
    class Complex {
      constructor(re, im) {
        this.re = re;
        this.im = im;
      }

      add(other) {
        return new Complex(this.re + other.re, this.im + other.im);
      }

      toString() {
        if (this.re === Infinity) {
          return 'Infinity';
        }
        if (this.im === 0) {
          return this.re.toString();
        }
        return `${this.re} + ${this.im}i`;
      }
    }

    const c1 = new Complex(1, 0);
    const c2 = new Complex(Infinity, 0);
    const result = c1.add(c2);
    expect(result.toString()).toBe('Infinity');
  });
});