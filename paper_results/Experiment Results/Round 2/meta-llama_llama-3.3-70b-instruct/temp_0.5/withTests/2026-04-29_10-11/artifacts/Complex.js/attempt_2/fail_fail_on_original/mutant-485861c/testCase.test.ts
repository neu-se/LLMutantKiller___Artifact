import { Complex } from './complex.js';

describe('Complex', () => {
  it('should parse a complex number correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);
  });
});