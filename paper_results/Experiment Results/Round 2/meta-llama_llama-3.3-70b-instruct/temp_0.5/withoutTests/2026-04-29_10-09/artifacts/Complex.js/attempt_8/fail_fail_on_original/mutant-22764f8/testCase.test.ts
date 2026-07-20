describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const a = complex["re"];
    expect(a).toBe(1);
    const result = complex.acot();
    expect(result["re"]).not.toBeNaN();
    expect(result["im"]).not.toBeNaN();
    expect(complex[""]).toBeUndefined();
  });
});