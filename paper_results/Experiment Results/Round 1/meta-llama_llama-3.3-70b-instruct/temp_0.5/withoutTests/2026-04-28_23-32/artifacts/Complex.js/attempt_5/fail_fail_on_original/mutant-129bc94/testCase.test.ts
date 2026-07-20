import Complex from './complex.js';

describe('Complex', () => {
  it('should have a property named Complex', () => {
    expect(Object.keys(Complex).includes('Complex')).toBe(true);
  });
});