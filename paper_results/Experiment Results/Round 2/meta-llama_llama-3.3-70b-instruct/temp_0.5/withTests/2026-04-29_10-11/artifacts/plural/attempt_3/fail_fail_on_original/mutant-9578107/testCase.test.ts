import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize "roof"', () => {
    expect(plural('roof')).toBe('roofs');
  });
});