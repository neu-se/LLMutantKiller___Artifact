import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expectedRe = 0.4026531892331356;
    const expectedIm = -0.4026531892331356;
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-6);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-6);
  });
});