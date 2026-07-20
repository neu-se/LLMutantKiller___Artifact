import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "man" but not match "oman"', () => {
    expect(plural('oman')).toBe('omans');
  });
});