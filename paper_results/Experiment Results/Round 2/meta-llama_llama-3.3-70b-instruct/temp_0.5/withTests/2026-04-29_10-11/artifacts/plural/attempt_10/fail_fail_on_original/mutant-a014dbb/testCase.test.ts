import plural = require('./index.js');

describe('plural', () => {
  it('should correctly handle words that end with "roof" or "dwarf"', () => {
    expect(plural('dwarf')).not.toBe('dwarves');
    expect(plural('roof')).not.toBe('rooves');
  });
});