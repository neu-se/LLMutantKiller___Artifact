import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should have a sech method that is a function', () => {
    const complex = new Complex(1, 1);
    expect(typeof complex.sech).toBe('function');
  });
});