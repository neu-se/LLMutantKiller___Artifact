import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle pluralization of words that end with "s"', () => {
    expect(plural('electronic')).toBe('electronics');
    expect(plural('electronics')).toBe('electronics');
  });
});