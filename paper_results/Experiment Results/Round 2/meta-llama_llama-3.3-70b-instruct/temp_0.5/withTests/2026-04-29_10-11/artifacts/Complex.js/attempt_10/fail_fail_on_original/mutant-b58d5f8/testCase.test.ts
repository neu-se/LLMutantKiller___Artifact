import { Complex } from './complex.js';

describe('Complex', () => {
  it('should parse a string with a missing imaginary part', () => {
    const c = new Complex('1');
    expect(c.re).toBe(1);
    expect(c.im).toBe(0);
  });
});