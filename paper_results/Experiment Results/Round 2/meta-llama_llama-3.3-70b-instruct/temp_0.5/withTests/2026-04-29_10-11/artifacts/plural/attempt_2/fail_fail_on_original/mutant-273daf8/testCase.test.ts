import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should correctly handle f/fe ending words', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});