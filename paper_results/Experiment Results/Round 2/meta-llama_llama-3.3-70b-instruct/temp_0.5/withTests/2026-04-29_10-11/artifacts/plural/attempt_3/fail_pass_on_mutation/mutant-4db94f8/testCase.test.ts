import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle string rules', () => {
    const word = 'criterion';
    const result = plural(word);
    expect(result).toBe('criteria');
    expect(typeof result).toBe('string');
    expect(result !== word).toBe(true);
  });
});