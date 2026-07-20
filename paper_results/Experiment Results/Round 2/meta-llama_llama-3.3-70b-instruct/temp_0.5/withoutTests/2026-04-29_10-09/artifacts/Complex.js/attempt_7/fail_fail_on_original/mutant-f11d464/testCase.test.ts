describe("Complex", () => {
  it("should handle fully imaginary base in pow function", () => {
    const complex = new Complex(0, 2);
    const result = complex.pow(2);
    expect(result.re).toBeCloseTo(-4);
    expect(result.im).toBeCloseTo(0);
  });
});