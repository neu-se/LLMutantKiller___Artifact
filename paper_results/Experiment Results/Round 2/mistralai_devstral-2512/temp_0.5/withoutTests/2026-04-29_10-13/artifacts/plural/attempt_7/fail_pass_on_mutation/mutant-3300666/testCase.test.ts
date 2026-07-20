import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function initialization', () => {
  it('should have empty rules array initially', () => {
    // This test directly checks if the rules array is properly initialized
    // The mutation changes rules from [] to ["Stryker was here"]
    // We need to test behavior that would be affected by this change
    const result = plural('test');
    expect(result).toBe('tests');
    expect(result).not.toContain('Stryker');
  });
});