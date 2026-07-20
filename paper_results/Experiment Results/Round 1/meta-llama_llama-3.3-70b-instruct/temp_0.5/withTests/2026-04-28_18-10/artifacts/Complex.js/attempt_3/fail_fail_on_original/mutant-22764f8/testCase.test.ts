import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});