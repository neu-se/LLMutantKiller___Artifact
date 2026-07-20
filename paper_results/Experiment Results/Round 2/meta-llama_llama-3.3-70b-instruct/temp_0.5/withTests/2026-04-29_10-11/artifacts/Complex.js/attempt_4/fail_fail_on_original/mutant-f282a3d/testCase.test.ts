import { Complex } from './complex';

describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);

    expect(() => new Complex('1+')).toThrowError('Invalid Param');
  });
});