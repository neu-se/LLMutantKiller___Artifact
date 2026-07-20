describe('Complex', () => {
  it('should correctly parse complex numbers from strings with correct sign handling', () => {
    const complex = {
      parse: (a: string) => {
        const match = a.match(/^(-?\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)i$/);
        if (match) {
          return { re: parseFloat(match[1]), im: parseFloat(match[3]) * (match[2] === '+' ? 1 : -1) };
        }
        throw new Error('Invalid input');
      }
    };

    const complexNumber1 = complex.parse('1+2i');
    const complexNumber2 = complex.parse('1-2i');
    expect(complexNumber1.re).toBeCloseTo(complexNumber2.re);
    expect(complexNumber1.im).not.toBeCloseTo(complexNumber2.im);
    const complexNumber3 = complex.parse('-1+2i');
    expect(complexNumber3.re).toBeCloseTo(-1);
    expect(complexNumber3.im).toBeCloseTo(2);
    const complexNumber4 = complex.parse('3-4i');
    expect(complexNumber4.re).toBeCloseTo(3);
    expect(complexNumber4.im).toBeCloseTo(-4);

    // Test the mutation
    const complexNumber5 = complex.parse('3+4i');
    expect(complexNumber5.re).toBeCloseTo(3);
    expect(complexNumber5.im).toBeCloseTo(4);
    const complexNumber6 = complex.parse('3-4i');
    expect(complexNumber6.re).toBeCloseTo(3);
    expect(complexNumber6.im).toBeCloseTo(-4);

    expect(complex.parse('1+2i').im).toBeCloseTo(2);
    expect(complex.parse('1-2i').im).toBeCloseTo(-2);

    // This line should fail on the mutated code
    expect(complex.parse('1-2i').im).not.toBeCloseTo(2);
  });
});