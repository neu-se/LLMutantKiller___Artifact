import plural from './index.js';

describe('plural function', () => {
  it('should correctly pluralize words with exact string matches', () => {
    expect(plural('criterion')).toBe('criteria');
  });
});