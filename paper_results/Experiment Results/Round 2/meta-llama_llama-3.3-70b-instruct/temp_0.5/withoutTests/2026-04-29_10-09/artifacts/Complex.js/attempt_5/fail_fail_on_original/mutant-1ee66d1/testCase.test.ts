import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number with a non-zero imaginary part', () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});