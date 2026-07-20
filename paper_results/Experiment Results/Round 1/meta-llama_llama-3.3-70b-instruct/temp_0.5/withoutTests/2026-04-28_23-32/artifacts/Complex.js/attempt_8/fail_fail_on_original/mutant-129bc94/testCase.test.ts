import Complex from './complex.js';

describe('Complex', () => {
  it('should have a property that is not an empty string', () => {
    const keys = Object.keys(Complex);
    expect(keys).not.toContain('');
  });
});