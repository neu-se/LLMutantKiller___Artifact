import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', function() {
  it('should handle f/fe ending words correctly', function() {
    expect(plural('roof')).toBe('roofs');
    expect(plural('dwarf')).toBe('dwarves');
  });
});