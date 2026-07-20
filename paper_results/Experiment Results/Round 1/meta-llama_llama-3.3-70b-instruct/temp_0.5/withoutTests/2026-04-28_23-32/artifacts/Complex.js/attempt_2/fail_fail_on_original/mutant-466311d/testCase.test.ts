import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 3001);
    const result = complex.log();
    expect(result.re).toBeCloseTo(8.109, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});