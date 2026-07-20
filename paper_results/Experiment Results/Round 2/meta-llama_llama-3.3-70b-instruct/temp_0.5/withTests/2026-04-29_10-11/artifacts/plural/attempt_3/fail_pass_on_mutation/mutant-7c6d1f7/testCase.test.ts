import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize words that end with "io"', () => {
    expect(plural('alio')).toBe('alios');
  });
});