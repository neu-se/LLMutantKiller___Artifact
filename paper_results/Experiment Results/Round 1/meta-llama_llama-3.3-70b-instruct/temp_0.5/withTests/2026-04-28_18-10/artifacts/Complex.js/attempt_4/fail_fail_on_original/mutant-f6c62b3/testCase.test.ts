import Complex from '../complex.js';

describe('Complex.js', () => {
  it('should not have an empty string property', () => {
    expect(Object.keys(Complex).includes('')).toBe(false);
  });
});