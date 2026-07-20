import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly parse complex numbers from strings and throw error for invalid input', () => {
    const c = new Complex('1+2i');
    expect(c.re).toBeCloseTo(1);
    expect(c.im).toBeCloseTo(2);
    expect(() => new Complex('5+')).toThrowError(SyntaxError);
  });
});