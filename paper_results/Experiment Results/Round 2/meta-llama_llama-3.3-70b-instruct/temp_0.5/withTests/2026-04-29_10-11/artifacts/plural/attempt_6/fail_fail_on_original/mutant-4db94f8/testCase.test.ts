import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle string rules', () => {
    const word = 'criterion';
    const result = plural(word);
    expect(result).toBe('criteria');
    const rule = plural.rules.find(rule => rule[0] === word);
    expect(rule).toBeDefined();
    expect(typeof rule[0]).toBe('string');
    expect(rule[1]).toBe('criteria');
  });
});