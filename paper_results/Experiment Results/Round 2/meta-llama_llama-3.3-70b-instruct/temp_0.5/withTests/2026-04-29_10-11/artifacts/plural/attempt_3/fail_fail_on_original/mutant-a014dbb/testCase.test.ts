import plural = require('./index.js');

describe('plural', () => {
  it('should correctly handle words that end with "roof" or "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});