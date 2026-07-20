import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function initialization', () => {
  it('should initialize with empty rules array', () => {
    // This test checks that the initial state of rules is correct
    // The mutation changes rules from [] to ["Stryker was here"]
    // We can detect this by checking the behavior of addRule
    plural.addRule('test', 'tests');
    const result = plural('test');
    expect(result).toBe('tests');
  });
});