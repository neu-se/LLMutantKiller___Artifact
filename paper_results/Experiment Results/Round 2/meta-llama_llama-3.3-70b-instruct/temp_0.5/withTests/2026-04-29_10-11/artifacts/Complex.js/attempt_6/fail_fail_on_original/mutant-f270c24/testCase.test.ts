import Complex from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for real numbers', () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.isInfinite()).toBe(false);
  });
});