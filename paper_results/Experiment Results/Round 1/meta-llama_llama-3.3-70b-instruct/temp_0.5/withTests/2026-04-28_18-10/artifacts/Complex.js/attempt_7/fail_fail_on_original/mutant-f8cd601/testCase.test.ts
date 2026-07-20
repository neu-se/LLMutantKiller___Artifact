import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should have a csch function', () => {
    const complex = new Complex(1, 1);
    expect(complex.csch).toBeDefined();
    expect(typeof complex.csch).toBe('function');
  });
});