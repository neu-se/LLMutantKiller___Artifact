import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "man" but not match partial words like "oman"', () => {
    expect(plural('oman')).toBe('omans');
  });
});