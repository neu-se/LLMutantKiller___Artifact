import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('1+2i');
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    const d = new Complex('1+i');
    expect(d.re).toBe(1);
    expect(d.im).toBe(1);
  });
});