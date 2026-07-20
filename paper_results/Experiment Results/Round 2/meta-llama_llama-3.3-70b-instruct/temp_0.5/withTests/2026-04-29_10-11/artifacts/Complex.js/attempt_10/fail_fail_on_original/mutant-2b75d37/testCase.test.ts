import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should have an acot method', () => {
    const complex = new Complex(1, 2);
    expect(complex.acot).toBeDefined();
    expect(typeof complex.acot).toBe('function');
  });
});