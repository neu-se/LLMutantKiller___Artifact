import Complex from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});