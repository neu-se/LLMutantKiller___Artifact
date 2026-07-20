import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);

    const invalidComplexNumber = new Complex('1+');
    expect(invalidComplexNumber.im).not.toBe(2);
  });
});