import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should have the im property defined after asinh', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(complex.im).toBeDefined();
  });
});