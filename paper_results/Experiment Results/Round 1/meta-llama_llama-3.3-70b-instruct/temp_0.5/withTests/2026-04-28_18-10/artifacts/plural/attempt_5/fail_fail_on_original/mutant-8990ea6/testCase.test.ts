import plural = require('./index');

describe('plural', () => {
  it('should correctly pluralize words that end with "quy"', () => {
    expect(plural('quy')).toBe('quies');
  });
});