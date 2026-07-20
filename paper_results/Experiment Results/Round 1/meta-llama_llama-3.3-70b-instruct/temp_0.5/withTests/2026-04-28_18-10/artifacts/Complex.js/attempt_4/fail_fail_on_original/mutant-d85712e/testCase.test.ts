import { Complex } from './complex';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('3+4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
  });

  it('should throw an error when parsing invalid complex numbers', () => {
    expect(() => new Complex('3+Stryker was here!i')).toThrow(SyntaxError);
  });
});