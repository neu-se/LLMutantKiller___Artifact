describe("Complex", () => {
  it("should handle fully imaginary base in pow function", () => {
    const complex = new Complex(2, 0);
    const result = complex.pow(2);
    expect(result.re).toBeCloseTo(4);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0, 2);
    const result2 = complex2.pow(2);
    expect(result2.re).toBeCloseTo(-4);
    expect(result2.im).toBeCloseTo(0);
  });
});