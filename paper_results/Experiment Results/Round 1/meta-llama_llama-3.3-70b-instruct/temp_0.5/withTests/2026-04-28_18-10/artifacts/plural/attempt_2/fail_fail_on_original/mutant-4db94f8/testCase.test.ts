import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('test');
    expect(plural('test', 2)).toBe('tests');
  });
});