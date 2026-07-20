import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('2-1i');
    expect(complex.re).toBe(2);
    expect(complex.im).toBe(-1);
  });
});