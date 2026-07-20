import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate asec for a = 1 and b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});