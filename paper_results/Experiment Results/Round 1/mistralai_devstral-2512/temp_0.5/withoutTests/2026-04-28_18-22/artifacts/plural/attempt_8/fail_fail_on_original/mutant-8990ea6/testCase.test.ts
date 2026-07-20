import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not match "quy" when it is not at the end of the word', () => {
    expect(plural('quyx')).toBe('quyxs');
  });
});