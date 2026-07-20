import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle objects with both "im" and "re" properties', () => {
    const c1 = new Complex({ im: 1, re: 2 });
    const c2 = new Complex({ im: 1, re: 2 });

    expect(c1.re).toBe(2);
    expect(c1.im).toBe(1);
    expect(c2.re).toBe(2);
    expect(c2.im).toBe(1);
    expect(new Complex({ re: 1, im: 1 }).equals({ re: 1, im: 1 })).toBe(true);
    expect(new Complex({ re: 1, im: 1 }).equals({ re: 1 })).not.toBe(true);
  });
});