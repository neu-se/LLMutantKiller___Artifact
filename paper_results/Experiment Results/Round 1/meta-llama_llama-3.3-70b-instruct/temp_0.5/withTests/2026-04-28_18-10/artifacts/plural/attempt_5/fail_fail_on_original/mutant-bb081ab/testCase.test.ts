import plural = require('./index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('test');
    expect(plural.addRule('test', 'tests')).toBe(plural);
  });
});