import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    const result = plural('criterion');
    expect(result).toBe('criteria');
  });
});