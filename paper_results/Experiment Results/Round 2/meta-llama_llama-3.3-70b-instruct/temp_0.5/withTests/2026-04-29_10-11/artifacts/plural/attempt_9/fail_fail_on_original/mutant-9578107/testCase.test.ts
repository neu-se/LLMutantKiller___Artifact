import plural = require('./index.js');

describe('plural', () => {
  it('should correctly pluralize words that end with "fe"', () => {
    expect(plural('knife')).toBe('knives');
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('roofs');
  });
});