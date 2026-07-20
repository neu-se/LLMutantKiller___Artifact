import plural = require('./index');

describe('plural', () => {
  it('should correctly handle f/fe ending words', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('roofs');
    expect(plural('wolf')).toBe('wolves');
  });
});