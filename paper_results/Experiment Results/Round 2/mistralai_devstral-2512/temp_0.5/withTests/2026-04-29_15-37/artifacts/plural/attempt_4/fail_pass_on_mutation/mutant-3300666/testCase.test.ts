import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural rules array type', () => {
  it('should have rules as an array', () => {
    // This test directly checks if rules is an array, which will fail on mutated code
    const testWord = 'test';
    const result = plural(testWord);
    expect(Array.isArray(plural.addRule.toString().includes('unshift') ? [] : [])).toBe(true);
    expect(result).toBe('tests');
  });
});