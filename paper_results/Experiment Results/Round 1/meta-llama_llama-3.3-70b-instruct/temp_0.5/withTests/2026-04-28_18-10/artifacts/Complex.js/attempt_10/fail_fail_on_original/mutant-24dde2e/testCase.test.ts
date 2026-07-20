import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    const expected = Math.acos(1/2);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});