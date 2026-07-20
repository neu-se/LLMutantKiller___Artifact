import Complex from './complex.js';

describe('Complex', () => {
  it('should clone correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone).toHaveProperty('re', 1);
    expect(clone).toHaveProperty('im', 2);
  });
});