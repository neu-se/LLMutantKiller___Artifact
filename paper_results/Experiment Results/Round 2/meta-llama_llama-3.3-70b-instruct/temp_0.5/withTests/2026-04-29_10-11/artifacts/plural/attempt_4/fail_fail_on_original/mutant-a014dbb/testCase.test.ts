import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly handle words that end with "roof" or "dwarf"', () => {
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
    expect(plural('hoof')).toBe('hooves');
    expect(plural('dwarf')).not.toBe('dwarves');
    expect(plural('roof')).not.toBe('rooves');
  });
});