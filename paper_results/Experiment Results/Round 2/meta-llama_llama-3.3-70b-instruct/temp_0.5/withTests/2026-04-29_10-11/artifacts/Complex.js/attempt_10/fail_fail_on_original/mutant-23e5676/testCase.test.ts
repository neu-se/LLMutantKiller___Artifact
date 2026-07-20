import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const expectedRe = -0.46364760900080615;
    const expectedIm = -0.46364760900080615;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});