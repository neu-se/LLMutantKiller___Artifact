import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function rules array initialization', () => {
  it('should start with empty rules array', () => {
    // This test will fail on mutated code because rules is initialized with a string
    // We test this by checking if we can add a rule that would conflict with the initial state
    expect(plural('test')).toBe('tests');
    expect(() => {
      plural.addRule('test', 'test');
    }).not.toThrow();
  });
});