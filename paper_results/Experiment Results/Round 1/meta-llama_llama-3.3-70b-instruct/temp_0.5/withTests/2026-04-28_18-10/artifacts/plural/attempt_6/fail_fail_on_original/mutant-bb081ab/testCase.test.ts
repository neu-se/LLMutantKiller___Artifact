import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should handle specific word correctly', () => {
    const result = plural('criterion');
    expect(result).toBe('criteria');
  });
});