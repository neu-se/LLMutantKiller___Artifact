import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle rules array initialization', () => {
    const originalRulesLength = plural.rules.length;
    plural.addRule('test', 'tests');
    expect(plural.rules.length).toBe(originalRulesLength + 1);
  });
});