import plural = require('../index');

describe('plural', () => {
  it('should correctly pluralize "dwarf" and "roof"', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});