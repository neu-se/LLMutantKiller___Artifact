import plural = require('../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly pluralize words that end with x, ch, or s', () => {
    expect(plural('box')).toBe('boxes');
    expect(plural('church')).toBe('churches');
    expect(plural('bus')).toBe('buses');
    expect(plural('fox')).toBe('foxes');
    expect(plural('tax')).toBe('taxes');
    expect(plural('x')).not.toBe('xes'); // This will fail in the mutated code
  });
});