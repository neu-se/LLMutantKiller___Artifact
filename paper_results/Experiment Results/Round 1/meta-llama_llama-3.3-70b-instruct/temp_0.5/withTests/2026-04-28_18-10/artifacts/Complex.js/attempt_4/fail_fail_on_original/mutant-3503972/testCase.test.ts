import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0, 10);
  });
});