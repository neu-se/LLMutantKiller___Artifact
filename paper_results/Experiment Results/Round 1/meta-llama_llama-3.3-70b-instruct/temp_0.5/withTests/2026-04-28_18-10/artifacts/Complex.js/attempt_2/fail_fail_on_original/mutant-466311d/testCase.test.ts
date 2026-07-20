import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(3001), 10);
  });
});