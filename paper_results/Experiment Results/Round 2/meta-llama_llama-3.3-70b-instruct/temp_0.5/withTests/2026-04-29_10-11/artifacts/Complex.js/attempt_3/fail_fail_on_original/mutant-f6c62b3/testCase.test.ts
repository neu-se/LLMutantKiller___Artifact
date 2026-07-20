import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should export Complex as a default export', () => {
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe('function');
  });
});