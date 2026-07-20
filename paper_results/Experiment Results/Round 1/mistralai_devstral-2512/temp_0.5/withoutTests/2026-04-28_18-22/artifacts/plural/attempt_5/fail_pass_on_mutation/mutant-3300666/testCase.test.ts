import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "leaf" to "leaves"', () => {
    expect(plural('leaf')).toBe('leaves');
  });
});