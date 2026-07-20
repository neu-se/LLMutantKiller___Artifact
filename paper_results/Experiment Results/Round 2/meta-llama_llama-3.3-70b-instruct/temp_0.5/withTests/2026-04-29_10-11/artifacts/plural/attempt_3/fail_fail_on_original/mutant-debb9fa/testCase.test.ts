import plural = require('./index');

describe('plural', () => {
  it('should handle f/fe ending words correctly', () => {
    expect(plural('dwarf')).toBe('dwarfs');
  });
});