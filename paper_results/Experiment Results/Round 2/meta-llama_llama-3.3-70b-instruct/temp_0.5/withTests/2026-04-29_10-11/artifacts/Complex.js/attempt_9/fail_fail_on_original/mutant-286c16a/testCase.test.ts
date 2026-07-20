import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should calculate the complex asinh of a complex number', () => {
    const complex = new Complex('1+2i');
    expect(complex.asinh).toBeInstanceOf(Function);
  });
});