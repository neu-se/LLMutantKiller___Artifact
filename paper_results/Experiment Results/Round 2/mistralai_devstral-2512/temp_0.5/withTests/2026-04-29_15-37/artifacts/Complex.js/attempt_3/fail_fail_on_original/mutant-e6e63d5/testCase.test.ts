const Complex = require("./complex.js");

describe("Complex.acsc()", () => {
  it("should compute the arc cosecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});