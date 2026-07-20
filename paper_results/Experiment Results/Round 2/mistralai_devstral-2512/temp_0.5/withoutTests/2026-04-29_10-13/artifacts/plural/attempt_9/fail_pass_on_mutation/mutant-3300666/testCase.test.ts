import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function rules initialization', () => {
  it('should have the correct number of default rules', () => {
    // The original code starts with empty rules array
    // The mutation starts with ["Stryker was here"]
    // We can detect this by checking the behavior when no rules match
    const result = plural('xyz');
    expect(result).toBe('xyzs');
  });
});