import { Complex } from './complex';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.23e+4i');
    expect(complexNumber.re).toBe(0);
    expect(complexNumber.im).toBe(12300);
  });
});