import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    const expected = Math.log(2 + Math.sqrt(2 * 2 + 1));
    expect(result.re).toBeCloseTo(expected, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});