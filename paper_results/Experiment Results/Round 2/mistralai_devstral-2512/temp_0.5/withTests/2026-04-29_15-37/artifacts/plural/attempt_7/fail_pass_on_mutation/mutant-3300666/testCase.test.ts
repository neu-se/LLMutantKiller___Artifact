import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function rules array type check', () => {
  it('should have rules as an array type', () => {
    // This test will fail on mutated code because rules is initialized as a string array
    // We test by checking if the first rule addition works correctly
    const result = plural.addRule('test', 'tests');
    expect(result).toBe(plural);
    expect(plural('test')).toBe('tests');
  });
});