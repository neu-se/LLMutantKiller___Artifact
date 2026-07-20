import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expectedRe = 0.5493061443340549;
    const expectedIm = -0.5493061443340549;
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(result.im).toBeCloseTo(expectedIm, 5);
  });
});