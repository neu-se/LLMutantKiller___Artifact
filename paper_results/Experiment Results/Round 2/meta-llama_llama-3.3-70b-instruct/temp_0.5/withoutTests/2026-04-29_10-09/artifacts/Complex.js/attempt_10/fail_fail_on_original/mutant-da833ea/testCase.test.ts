const Complex = require("../../../../complex.js").Complex;

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const expectedRealPart = Math.log((1 + Math.sqrt(1 - 0.5 * 0.5)) / 0.5);
    expect(result.re).toBeCloseTo(expectedRealPart);
  });
});