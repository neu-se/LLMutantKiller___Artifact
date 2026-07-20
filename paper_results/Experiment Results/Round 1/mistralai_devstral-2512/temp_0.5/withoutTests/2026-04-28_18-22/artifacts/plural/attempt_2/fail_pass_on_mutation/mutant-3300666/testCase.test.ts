import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words matching the first rule', () => {
    expect(plural('cherry')).toBe('cherries');
  });
});