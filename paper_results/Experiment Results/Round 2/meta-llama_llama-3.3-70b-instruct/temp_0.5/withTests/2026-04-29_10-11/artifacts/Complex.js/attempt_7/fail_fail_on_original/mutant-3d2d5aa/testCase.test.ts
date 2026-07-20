const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should correctly calculate the complex acoth for a = 1 and b = 1', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expectedRe = 0.5493061443340548;
    const expectedIm = -0.5493061443340548;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});