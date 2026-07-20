import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function initial state', () => {
  it('should start with empty rules array', () => {
    // This test will fail on mutated code because rules is initialized with a string
    // We test by checking if the first rule addition works correctly
    const result = plural.addRule(/^test$/i, 'tests');
    expect(result).toBe(plural);
    expect(plural('test')).toBe('tests');
  });
});