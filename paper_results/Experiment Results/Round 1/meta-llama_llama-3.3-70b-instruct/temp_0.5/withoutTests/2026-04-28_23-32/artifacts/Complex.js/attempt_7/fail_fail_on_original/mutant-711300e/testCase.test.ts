import { Complex } from './complex.js';

describe('Complex class', () => {
  it('should throw an error when only im is provided and not re', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    expect(() => {
      const complex2 = new Complex({ im: 1 });
      expect(complex2.re).toBe(0);
      expect(complex2.im).toBe(1);
    }).toThrowError(SyntaxError);
  });
});