import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle empty string in misc array', () => {
    expect(plural('electronic')).toBe('electronics');
  });
});