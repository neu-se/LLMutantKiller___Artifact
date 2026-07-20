import Complex from './complex.js';

describe('Complex', () => {
  it('should have a property named Complex', () => {
    const keys = Object.keys(Complex);
    expect(keys.includes('Complex')).toBe(true);
  });
});