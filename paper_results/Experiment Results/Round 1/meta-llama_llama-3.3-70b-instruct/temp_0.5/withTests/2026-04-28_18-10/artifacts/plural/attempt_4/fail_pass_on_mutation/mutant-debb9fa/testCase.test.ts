import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should correctly pluralize "wolf"', () => {
    expect(plural('wolf')).toBe('wolves');
  });
});