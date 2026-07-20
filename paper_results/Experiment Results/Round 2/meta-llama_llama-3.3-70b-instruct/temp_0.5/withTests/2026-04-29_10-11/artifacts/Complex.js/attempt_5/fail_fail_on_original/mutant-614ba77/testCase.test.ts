import Complex from './complex.js';

describe('Complex', () => {
  it('should have a default property', () => {
    expect(Object.keys(Complex)).toContain('default');
  });
});