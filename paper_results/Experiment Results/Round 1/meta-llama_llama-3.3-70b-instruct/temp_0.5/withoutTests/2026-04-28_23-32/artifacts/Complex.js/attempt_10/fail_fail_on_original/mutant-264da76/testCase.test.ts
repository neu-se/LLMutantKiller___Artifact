import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    const expectedRe = 0.5493061443340549;
    const expectedIm = -0.5493061443340549;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
    expect(result.re).not.toBeCloseTo(-expectedRe, 10);
  });
});