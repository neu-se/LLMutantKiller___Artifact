import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should not create a Complex object with an object that has only "im" property', () => {
    const c = new Complex({ im: 1, re: 0 });
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    expect(() => new Complex({ im: 1 })).toThrow();
  });
});