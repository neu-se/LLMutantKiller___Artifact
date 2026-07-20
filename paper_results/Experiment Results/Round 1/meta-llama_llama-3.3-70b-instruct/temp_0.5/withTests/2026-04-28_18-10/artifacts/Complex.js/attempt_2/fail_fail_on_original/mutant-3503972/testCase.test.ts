import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});