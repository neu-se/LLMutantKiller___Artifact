describe('Complex', () => {
  it('should calculate acsch correctly for b = 0', () => {
    const Complex = require('../../../../complex.js').Complex;
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should throw an error for b !== 0 in the mutated code', () => {
    const Complex = require('../../../../complex.js').Complex;
    const c = new Complex(0, 1);
    expect(() => c.acsch()).toThrowError();
  });
});