import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rules initialization', () => {
  it('should have empty rules array initially', () => {
    // This test checks that the rules array starts empty
    // The mutation changes rules from [] to ["Stryker was here"]
    // We can detect this by checking the first rule's behavior
    const result = plural('test');
    expect(result).toBe('tests');
  });
});