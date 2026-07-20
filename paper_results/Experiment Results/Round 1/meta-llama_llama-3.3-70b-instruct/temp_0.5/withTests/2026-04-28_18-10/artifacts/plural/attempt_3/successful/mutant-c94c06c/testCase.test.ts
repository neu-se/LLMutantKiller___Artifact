import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', function() {
  it('should handle f/fe ending words correctly', function() {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});