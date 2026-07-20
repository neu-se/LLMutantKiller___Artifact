import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function behavior', () => {
  it('should correctly pluralize a basic word', () => {
    expect(plural('test')).toBe('tests');
    expect(plural.addRule('test', 'tests')).toBe(plural);
  });
});