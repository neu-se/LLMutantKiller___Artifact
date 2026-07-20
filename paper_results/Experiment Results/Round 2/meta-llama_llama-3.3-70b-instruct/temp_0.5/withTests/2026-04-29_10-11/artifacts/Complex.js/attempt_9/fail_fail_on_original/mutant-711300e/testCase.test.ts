import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle objects with both "im" and "re" properties', () => {
    const c = new Complex({ re: 1, im: 2 });
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    expect(() => new Complex({ im: 1 })).toThrow();
  });
});