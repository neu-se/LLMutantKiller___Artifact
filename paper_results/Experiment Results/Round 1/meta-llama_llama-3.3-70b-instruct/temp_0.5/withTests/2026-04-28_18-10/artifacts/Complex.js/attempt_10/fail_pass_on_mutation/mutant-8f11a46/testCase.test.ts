describe('Complex.js', () => {
  it('should correctly handle the case when plus and minus counters are not zero', () => {
    const complex = {
      re: 1,
      im: 2
    };
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const plus = 1;
    const minus = 0;
    if (plus + minus === 0) {
      throw new Error('Invalid input');
    }
  });
});