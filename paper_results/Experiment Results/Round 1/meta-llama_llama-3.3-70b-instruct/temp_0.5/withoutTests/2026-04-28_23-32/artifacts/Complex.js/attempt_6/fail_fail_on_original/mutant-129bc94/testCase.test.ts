import Complex from './complex.js';

describe('Complex', () => {
  it('should not have an empty string property that references itself', () => {
    expect(Object.keys(Complex).includes('')).toBe(false);
    expect(Complex['']).not.toBe(Complex);
  });
});