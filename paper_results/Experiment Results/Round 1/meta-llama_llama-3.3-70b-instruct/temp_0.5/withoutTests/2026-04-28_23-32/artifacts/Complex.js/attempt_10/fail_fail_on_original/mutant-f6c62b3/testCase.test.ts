describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    const complex = new (require('../complex.js').Complex)(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});