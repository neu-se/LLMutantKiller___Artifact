import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const expected = new Complex(0, -0.48121182505960347);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});