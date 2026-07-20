import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 1);
    const result = complex.log();
    expect(result.re).toBeGreaterThan(0);
  });
});