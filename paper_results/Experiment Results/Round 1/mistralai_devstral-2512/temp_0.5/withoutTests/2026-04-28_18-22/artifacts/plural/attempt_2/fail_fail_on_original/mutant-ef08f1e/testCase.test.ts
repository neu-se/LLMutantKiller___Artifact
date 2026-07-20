import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "o" where the mutation affects the regex pattern', () => {
    expect(plural('kilo')).toBe('kilo');
  });
});