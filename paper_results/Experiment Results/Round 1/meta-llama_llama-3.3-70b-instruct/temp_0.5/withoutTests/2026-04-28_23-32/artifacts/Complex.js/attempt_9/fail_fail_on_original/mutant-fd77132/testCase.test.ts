import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should have a function asec', () => {
    const c = new Complex(1, 1);
    expect(c).toHaveProperty('asec');
  });
});