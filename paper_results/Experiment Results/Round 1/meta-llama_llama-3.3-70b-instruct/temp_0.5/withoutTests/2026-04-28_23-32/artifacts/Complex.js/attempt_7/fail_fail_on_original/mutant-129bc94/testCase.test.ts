import Complex from '../complex.js';

describe('Complex', () => {
  it('should not have an empty string property', () => {
    const complexKeys = Object.keys(Complex);
    expect(complexKeys.includes('')).toBe(false);
  });
});