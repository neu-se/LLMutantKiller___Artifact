import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a csch function that returns a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result).toBeInstanceOf(Complex);
  });
});