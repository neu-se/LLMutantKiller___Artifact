import { Complex } from './complex.js';

describe('Complex', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3-4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(-4);
  });
});