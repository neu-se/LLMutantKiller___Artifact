import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function with custom rule', () => {
  it('should correctly apply custom rules', () => {
    // This test will fail on mutated code because the initial rules array is not empty
    plural.addRule('custom', 'customs');
    const result = plural('custom');
    expect(result).toBe('customs');
  });
});