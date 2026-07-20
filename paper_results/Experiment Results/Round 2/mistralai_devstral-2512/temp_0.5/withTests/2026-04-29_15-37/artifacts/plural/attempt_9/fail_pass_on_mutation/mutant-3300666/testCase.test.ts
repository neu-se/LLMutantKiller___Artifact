import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function rules array behavior', () => {
  it('should correctly handle rule precedence', () => {
    // This test will fail on mutated code because the initial rules array is not empty
    // We test by adding a rule that should match first
    plural.addRule('test', 'custom');
    expect(plural('test')).toBe('custom');
  });
});