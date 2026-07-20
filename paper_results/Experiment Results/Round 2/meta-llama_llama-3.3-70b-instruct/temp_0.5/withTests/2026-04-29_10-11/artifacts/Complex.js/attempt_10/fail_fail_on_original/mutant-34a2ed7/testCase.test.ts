describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = {
      parse: (a, b) => {
        if (typeof a === 'string') {
          const match = a.match(/^([+-]?\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)i$/);
          if (match) {
            return { re: parseFloat(match[1]), im: parseFloat(match[3]) * (match[2] === '+' ? 1 : -1) };
          }
        }
        throw new Error('Invalid input');
      }
    };

    const complexNumber = complex.parse('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const c = complex.parse('2');
    expect(c.re).toBe(2);
    expect(c.im).toBe(0);
    const d = complex.parse('1');
    expect(d.re).toBe(1);
    expect(d.im).toBe(0);
    const e = complex.parse('1+2i');
    expect(e.re).toBe(1);
    expect(e.im).toBe(2);
    expect(complex.parse('1+2i').re).toBe(1);
    expect(complex.parse('1+2i').im).toBe(2);
    const f = complex.parse('3');
    expect(f.re).toBe(3);
    expect(f.im).toBe(0);
    expect(complex.parse('1+2i').re).toBe(1);
    expect(complex.parse('1+2i').im).toBe(2);
  });
});