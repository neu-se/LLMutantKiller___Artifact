describe("Complex.js", () => {
  it("should correctly parse complex numbers with newline characters in the string representation", () => {
    const Complex = require('./complex.js').Complex;
    const complexNumber = new Complex('1+2i ');
    const complexNumber2 = new Complex('1+2i\t');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(2);
  });
});