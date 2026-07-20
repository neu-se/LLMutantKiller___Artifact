import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.im).not.toBeNaN();
  });
});