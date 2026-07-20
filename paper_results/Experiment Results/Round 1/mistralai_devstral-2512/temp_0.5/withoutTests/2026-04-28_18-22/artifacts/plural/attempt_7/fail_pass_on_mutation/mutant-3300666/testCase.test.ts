import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "wolf" to "wolves"', () => {
    expect(plural('wolf')).toBe('wolves');
  });
});