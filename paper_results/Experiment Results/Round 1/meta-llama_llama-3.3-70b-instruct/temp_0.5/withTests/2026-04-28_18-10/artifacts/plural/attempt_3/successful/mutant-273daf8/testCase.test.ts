import plural = require('../../../../../../../../../../../subject_repositories/plural/index');

describe('plural function', () => {
  it('should correctly handle words that end with "fe" or "f" and are not "dwarf" or "roof"', () => {
    expect(plural('roof')).toBe('roofs');
  });
});