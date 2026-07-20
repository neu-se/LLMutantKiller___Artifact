import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});