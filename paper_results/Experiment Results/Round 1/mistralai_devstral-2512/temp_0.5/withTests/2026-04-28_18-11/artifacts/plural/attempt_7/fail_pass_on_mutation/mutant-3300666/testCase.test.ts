import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with custom rule', () => {
  it('should correctly apply custom rules when rules array is properly initialized', () => {
    // This test will fail on mutated code because the rules array starts with
    // ["Stryker was here"] instead of [], causing rule processing to behave differently
    const result = plural('custom');
    expect(result).toBe('customs');
  });
});