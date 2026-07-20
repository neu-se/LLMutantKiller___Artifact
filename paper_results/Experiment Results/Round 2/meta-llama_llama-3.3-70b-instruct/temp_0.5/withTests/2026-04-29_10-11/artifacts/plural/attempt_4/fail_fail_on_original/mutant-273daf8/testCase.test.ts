import plural = require('./index');

describe('plural', () => {
  it('should correctly handle f/fe ending words', () => {
    expect(plural('roof')).toBe('roofs');
    expect(plural('dwarf')).toBe('dwarves');
  });
});