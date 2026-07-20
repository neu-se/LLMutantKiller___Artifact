import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should create a complex number with default values when no arguments are provided', () => {
    const complex = new Complex();
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});