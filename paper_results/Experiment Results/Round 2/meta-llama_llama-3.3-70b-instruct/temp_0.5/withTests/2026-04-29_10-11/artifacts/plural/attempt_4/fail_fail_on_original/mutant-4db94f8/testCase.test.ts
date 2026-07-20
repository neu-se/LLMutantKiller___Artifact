import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle type checking for string rules', () => {
    const word = 'criterion';
    const rule = plural.rules.find(rule => rule[0] === word);
    expect(rule).toBeDefined();
    expect(typeof rule[0]).toBe('string');
  });
});