import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acsch correctly for b = 0 in the original code but fail in the mutated code', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});