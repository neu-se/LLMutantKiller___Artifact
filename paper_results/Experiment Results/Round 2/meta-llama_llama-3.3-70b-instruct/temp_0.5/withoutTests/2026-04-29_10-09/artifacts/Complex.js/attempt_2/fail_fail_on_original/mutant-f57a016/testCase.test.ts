import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('2+');
    expect(c.re).toBe(2);
    expect(c.im).toBe(0);
  });
});