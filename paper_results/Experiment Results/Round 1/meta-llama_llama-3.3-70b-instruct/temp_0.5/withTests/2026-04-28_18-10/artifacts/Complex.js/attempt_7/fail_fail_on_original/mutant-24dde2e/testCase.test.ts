import Complex from './complex.js';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    const expected = Math.PI / 2;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});