const Complex = require('./complex').Complex;

describe('Complex', () => {
  it('should correctly multiply two complex numbers with real values', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(4, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(8);
    expect(result.im).toBeCloseTo(0);
    expect(Object.keys(result).length).toBe(2); 
  });
});