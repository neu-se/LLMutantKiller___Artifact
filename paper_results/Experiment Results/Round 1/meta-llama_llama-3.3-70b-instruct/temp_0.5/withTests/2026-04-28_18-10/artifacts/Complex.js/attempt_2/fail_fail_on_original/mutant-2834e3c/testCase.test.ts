import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});