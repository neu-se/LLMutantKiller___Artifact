import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex acsch for non-zero b', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.481, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});