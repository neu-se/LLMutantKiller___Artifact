describe("Complex", () => {
  it("should return the correct result for the sech function", () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.6630376474389426);
    expect(result.im).toBeCloseTo(0);
  });
});