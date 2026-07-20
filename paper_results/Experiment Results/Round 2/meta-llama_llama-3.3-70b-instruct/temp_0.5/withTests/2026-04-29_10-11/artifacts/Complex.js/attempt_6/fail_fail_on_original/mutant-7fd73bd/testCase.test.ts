import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate log correctly', () => {
    const c = new Complex(2, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBeCloseTo(0);

    const c2 = new Complex(1, 0);
    const result2 = c2.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);

    const c3 = new Complex(0.5, 0);
    const result3 = c3.log();
    expect(result3.re).toBeCloseTo(Math.log(0.5));
    expect(result3.im).toBeCloseTo(0);
  });
});