import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle the first rule', () => {
    expect(plural('cherry')).toBe('cherries');
    plural.addRule('test', 'tests');
    expect(plural('cherry')).toBe('cherries');
  });
});