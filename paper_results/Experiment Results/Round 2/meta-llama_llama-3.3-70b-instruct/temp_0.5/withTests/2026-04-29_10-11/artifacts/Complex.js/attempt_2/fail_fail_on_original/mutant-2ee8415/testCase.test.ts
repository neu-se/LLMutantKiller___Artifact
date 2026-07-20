import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const complex = new Complex(1, 2);
    const asinh = complex.asinh();
    expect(asinh instanceof Complex).toBe(true);
    expect(asinh.re).toBeCloseTo(0.48121182505960347);
    expect(asinh.im).toBeCloseTo(2.304533924561321);
  });
});