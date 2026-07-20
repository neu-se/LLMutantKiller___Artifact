import { Complex } from './complex';

describe('Complex', () => {
  it('should have a defined asinh method', () => {
    const complex = new Complex(1, 2);
    expect(complex.asinh).toBeDefined();
    expect(complex.asinh()).toBeInstanceOf(Complex);
  });
});