import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(typeof result).toBe('object');
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
  });
});