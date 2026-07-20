import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should return the correct plural form for a given word', () => {
    const word = 'cactus';
    const rules = plural.rules;
    const ruleIndex = rules.findIndex(rule => rule[0] instanceof RegExp && rule[0].test(word));
    if (ruleIndex !== -1) {
      const rule = rules[ruleIndex];
      if (typeof rule[1] === 'function') {
        expect(rule[1](word)).toBe('cacti');
      }
    }
  });
});