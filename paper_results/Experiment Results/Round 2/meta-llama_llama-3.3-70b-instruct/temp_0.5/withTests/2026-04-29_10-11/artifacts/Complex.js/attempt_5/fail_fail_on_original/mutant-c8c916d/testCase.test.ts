import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should handle acsc correctly for non-zero and non-infinity values', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});