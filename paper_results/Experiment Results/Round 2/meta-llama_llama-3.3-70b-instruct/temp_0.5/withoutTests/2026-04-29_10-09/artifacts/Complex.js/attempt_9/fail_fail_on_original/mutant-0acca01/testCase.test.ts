import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acoth correctly for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expectedRe = -0.5493061443340549;
    const expectedIm = 0.46364760900080615;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});