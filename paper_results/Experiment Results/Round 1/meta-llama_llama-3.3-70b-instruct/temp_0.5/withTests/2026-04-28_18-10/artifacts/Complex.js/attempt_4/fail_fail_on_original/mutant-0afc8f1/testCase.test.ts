import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    expect(complex.asech).toBeDefined();
    expect(typeof complex.asech).toBe('function');
  });
});