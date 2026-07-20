import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acosh with correct quadrant handling', () => {
    const complex = new Complex({ r: 2, phi: Math.PI / 2 });
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});