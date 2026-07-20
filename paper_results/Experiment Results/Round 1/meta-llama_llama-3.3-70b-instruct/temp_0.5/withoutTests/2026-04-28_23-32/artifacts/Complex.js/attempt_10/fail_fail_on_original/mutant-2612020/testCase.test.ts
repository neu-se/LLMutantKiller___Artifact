import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should have a real part equal to 0 when parsing an empty string', () => {
    const complex = new Complex('');
    expect(complex.re).toBe(0);
  });
});