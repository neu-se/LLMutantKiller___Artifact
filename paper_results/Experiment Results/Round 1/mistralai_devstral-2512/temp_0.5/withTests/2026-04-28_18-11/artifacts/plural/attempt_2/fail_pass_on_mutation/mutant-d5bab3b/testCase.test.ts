import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not match "oman" as a special case for man/woman rule', () => {
    expect(plural('oman')).not.toBe('omen');
  });
});