import plural = require('./index.js');

describe('plural', () => {
  it('should correctly pluralize "dwarf" and "roof" with mutation', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
    expect(plural('wolf')).toBe('wolves');
  });
});