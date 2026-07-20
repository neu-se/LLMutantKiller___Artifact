import plural from './index.js';

describe('plural function', () => {
  it('should return the correct plural form for a word ending with "y" preceded by a consonant', () => {
    expect(plural('cherry')).toBe('cherries');
  });
});