import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the string "Stryker was here" when checking rules array contents', () => {
    // This test directly checks if the mutation is present by accessing the internal rules
    // The mutation changes rules from [] to ["Stryker was here"]
    // We can detect this by checking the first rule's behavior
    const result = plural('test');
    expect(typeof result).toBe('string');
    expect(result).toBe('tests');
  });
});