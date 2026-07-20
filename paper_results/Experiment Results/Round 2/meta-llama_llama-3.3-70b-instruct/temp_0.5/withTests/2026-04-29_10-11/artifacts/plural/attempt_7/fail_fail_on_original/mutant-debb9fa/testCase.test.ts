import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle f/fe ending words correctly', () => {
    expect(plural('wolf')).toBe('wolves');
    expect(plural('dwarf')).toBe('dwarves');
  });
});