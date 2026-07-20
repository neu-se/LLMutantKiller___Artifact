import { Complex } from './complex.js';

describe('Complex', () => {
  it('should create a complex number with im property equal to 0 when no arguments are provided', () => {
    const complex = new Complex();
    expect(complex.im).toBe(0);
  });
});