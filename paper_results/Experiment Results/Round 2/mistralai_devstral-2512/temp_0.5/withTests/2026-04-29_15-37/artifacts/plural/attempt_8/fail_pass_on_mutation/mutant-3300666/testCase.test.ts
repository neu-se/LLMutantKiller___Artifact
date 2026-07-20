import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function initial rules state', () => {
  it('should correctly handle the first rule addition', () => {
    // This test will fail on mutated code because rules starts as a string array
    // We test by adding a rule and checking the result
    plural.addRule('unique', 'uniques');
    expect(plural('unique')).toBe('uniques');
  });
});