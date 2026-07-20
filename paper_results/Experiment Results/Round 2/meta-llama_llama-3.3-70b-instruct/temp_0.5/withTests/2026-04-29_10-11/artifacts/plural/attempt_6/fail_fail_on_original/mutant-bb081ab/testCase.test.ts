import plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize words with exact string matches', () => {
    plural.addRule('criterion', 'criteria');
    expect(plural('criterion')).toBe('criteria');
  });
});